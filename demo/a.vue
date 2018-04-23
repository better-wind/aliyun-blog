<template>
    <div>
        <div class="title">
            <span>管理配送模板</span>
        </div>
        <p class="btn-wrap">
            <el-button type="primary" @click="showTplLayer()">新增配送模板</el-button>
        </p>
        <div class="section">
            <transition v-if="!isReady"  name="slide-fade">
                <div class="block-item-loading">
                    <i class="el-icon-loading c-red"></i>
                </div>
            </transition>

            <transition v-if="isReady"  name="slide-fade">
                <div>
                    <div class="section-item" v-for="(item,index) in distributionList" :key="index">
                        <div class="block-item o-h">
                            <span>模板名称：{{item.name}}</span>
                            <el-button class="fl-r" type="primary" size="small" @click="deleteTpl(index)">删除</el-button>
                            <el-button class="fl-r" style="margin-right: 10px" type="primary" size="small"
                                       @click="showTplLayer(index+'')">修改
                            </el-button>

                        </div>
                        <div class="block-item">
                            <span v-if="item.type==1">限制类型：仅发以下地区</span>
                            <span v-else-if="item.type==2">限制类型：以下地区不发货</span>
                            <span v-else-if="item.type==3">限制类型：限制仅发货省份中的不发货区县</span>
                        </div>
                        <div class="block-item">
              <span>限制地区：<span v-if="isCityDetail" v-html="limitName[index]"></span>
              <i v-else class="el-icon-loading c-red"></i>
              </span>
                        </div>
                        <div class="block-item">
                            <span>模板描述：{{item.desc}}</span>
                        </div>
                    </div>
                </div>

            </transition>

        </div>
        <el-dialog :title="tplLayer.title" size="large" v-model="tplLayer.show">
            <div class="price-ct">
                <div class="input-ct">
                    <div>
                        <span>模板名称：</span>
                        <el-input v-model="tplLayer.inputName" placeholder="请输入内容"></el-input>
                    </div>
                    <div>
                        <span>限制类型：</span>
                        <el-radio-group v-model="tplLayer.radioType">
                            <el-radio :label="1">仅发以下地区</el-radio>
                            <el-radio :label="2">以下地区不发货</el-radio>
                        </el-radio-group>
                    </div>
                    <div style="overflow: hidden">
                        <span style="float: left">限制地区：</span>
                        <div class="limit-tree-wrap">
                            <!--:load="loadLimit"-->
                            <el-tree
                                    :data="limitData"
                                    show-checkbox
                                    node-key="id"
                                    ref="tree"
                                    @node-expand="nodeExpand"
                                    @node-collapse="nodeCollapse"
                                    @current-change="checkChange"
                                    @node-click="nodeClick"
                                    highlight-current
                                    :props="defaultProps">
                            </el-tree>
                        </div>
                    </div>
                    <div>
                        <span>模板描述：</span>
                        <el-input v-model="tplLayer.inputDesc" placeholder="请输入内容"></el-input>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveTpl">确 定</el-button>
                <el-button @click="cancelTpl">取 消</el-button>
            </div>
        </el-dialog>
        <el-dialog title="提示" v-model="dialogVisible" size="tiny">
            <span>确定删除【{{distributionListName}}】模板？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmDelete">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'vuex'
    export default {
        name: 'distributionTemplate',
        created (){
            this.initView()
        },
        data: () => ({
        isReady:false,
        isCityDetail:false,
        tplLayer: {
            show: false,
            title: '',
            inputName: '',
            inputDesc: '',
            radioType: 1,
            index: 0,
            cityArr: [],
        },
        limitName:[],
        localAllCity: {
            provinceList: [],
            cityList: [],
            districtList: []
        },
        dialogVisible: false,
        index: null,
        distributionListName: '',
        distributionList: [],
        limitData: [
//              {
//                id: 1,
//                label: '一级 1',
//                children: [
//                    {
//                      id: 4,
//                      label: '二级 1-1',
//                      children: [
//                          {
//                          id: 9,
//                          label: '三级 1-1-1'
//                          }
//                      ]
//                    }]
//              }
        ],
        defaultProps: {
            children: 'children',
            label: 'label'
        },
        mapLimitData:{

        },
        limitCheckList:{
            province:[],
            city:[],
            district:[]
        },
        mapAllAreaName:{},
        mapAllArea:{},
        mapAllAreaList:[],
        mapAreaLength:{

        },
        mapProvinceAreaLength:{
//          1:1
        },
        mapCityAreaLength:{
//          1:{
//              _len:1,
//              id:''
//          }
        },
        checkMapAreaLength:{},
        indeterminateArea:{}
    }),
    computed: {
    ...mapState(['allCity'])
    },
    methods: {
    ...mapActions(['getDistributionTemplate', 'deleteDeliverTpl', 'saveDeliverTpl', 'getAllCity', 'callSetNotice']),
            initView() {
            if (!Util.storage.get('CityStorage')) {
                this.getAllCity()
                    .then(() => {
                    Util.storage.set('CityStorage', this.allCity.data)
                this.initList()
            })
            } else {
                this.initList()
            }

        },
        initList() {
            this.setAreaBase()
            this.callGetDistributionTemplate()
        },
        setAreaBase(){
            var allList = Util.storage.get('CityStorage')
            this.localAllCity.provinceList = allList.provinceList
            this.localAllCity.cityList = allList.cityList
            this.localAllCity.districtList = allList.districtList

            //初始化处理省 市 区 全选计数
            this.localAllCity.provinceList.forEach((item)=>{
                this.mapProvinceAreaLength[item.provinceId] = 0
            this.mapAllAreaName[item.provinceId] = item.name
//          this.mapAllAreaList[item.provinceId] = []
        })
            this.localAllCity.cityList.forEach((item)=>{
                this.mapCityAreaLength[item.cityId] = {
                len:0,
                id:item.provinceId
            }
            this.mapAllArea[item.cityId] = item.provinceId
//          this.mapAllAreaList[item.cityId] = []
//          this.mapAllAreaList[item.provinceId].push(item.cityId)
            this.mapAllAreaName[item.cityId] = item.name
        })

            this.localAllCity.districtList.map((item)=>{
                if(this.mapCityAreaLength[item.cityId]){
                this.mapCityAreaLength[item.cityId].len++
                this.mapProvinceAreaLength[this.mapCityAreaLength[item.cityId].id] ++
            }
            item.provinceId = this.mapAllArea[item.cityId]
            this.mapAllArea[item.districtId] = item.cityId
//          this.mapAllAreaList[item.cityId].push(item.districtId)
            this.mapAllAreaName[item.districtId] = item.name
        })
        },
        callGetDistributionTemplate(){
            this.isReady = false
            this.getDistributionTemplate()
                .then((rs) => {
                //遍历城市编码转换城市名称
                this.distributionList = rs
            // 延时加载
//            this.$nextTick(() => {
//              this.setLimitAreaName()
//            })
            this.isReady = true
            this.isCityDetail = false
            this.limitName = []
            setTimeout(function(){
                this.setLimitAreaName()
                this.isCityDetail = true
            }.bind(this),1000)

        })
        },
        setLimitAreaName(){
            for (let i = 0, j = this.distributionList.length; i < j; i++) {
                let list = this.distributionList[i].limitAreaList
                let _checkMapAreaLength = {}, _province = [], _city = [], _district = []
                for (let n = 0, m = list.length; n < m; n++) {
                    let item = list[n]
                    if (!_checkMapAreaLength[item.provinceCode]) {
                        _checkMapAreaLength[item.provinceCode] = 1
                    } else {
                        _checkMapAreaLength[item.provinceCode]++
                    }
                    if (!_checkMapAreaLength[item.cityCode]) {
                        _checkMapAreaLength[item.cityCode] = 1
                    } else {
                        _checkMapAreaLength[item.cityCode]++
                    }
                }
                for (let i in _checkMapAreaLength) {
                    // 选择的 省
                    if (_checkMapAreaLength[i] == this.mapProvinceAreaLength[i]) {
                        _province.push(i)
                    }
                    // 选择 的 市
                    if (this.mapCityAreaLength[i] && _checkMapAreaLength[i] == this.mapCityAreaLength[i].len) {
                        _city.push(i)
                    }
                }
                _district = list.filter(item => !_province.includes(item.provinceCode) && !_city.includes(item.cityCode))
                let _sNameList = [], _limitList = []
                _limitList = _limitList.concat(_district)
                _province.forEach((item) => {
                    _sNameList.push(this.mapAllAreaName[item])
            })
                _city.forEach((item) => {
                    if (!_province.includes(this.mapAllArea[item])) {
                    let _opts = {
                        provinceCode: '',
                        cityCode: item,
                        districtCode: 1,
                    }
                    _limitList.push(_opts)
                }

            })
                _limitList.sort((a, b) => {
                    return a.cityCode - b.cityCode
                })
                let current = '', _subList = []
                _limitList.forEach((item, idx) => {
                    if (item.cityCode != current) {
                    current = item.cityCode
                    if (_limitList[idx - 1] && _limitList[idx - 1].districtCode != 1) {
                        _sNameList.push(this.mapAllAreaName[_limitList[idx - 1].cityCode] + '(<span style="color:#aaa">' + _subList.join('，') + '</span>)')
                    }
                    if (item.districtCode == 1) {
                        _sNameList.push(this.mapAllAreaName[item.cityCode])
                    } else {
                        _subList = [this.mapAllAreaName[item.districtCode]]
                    }
                }
            else {
                    _subList.push(this.mapAllAreaName[item.districtCode])
                }

            })
                this.limitName.push(_sNameList.join('，'))
            }
        },
        showTplLayer(index){
            this.index = index || null
            this.tplLayer.title = index ? '修改配送模板' : '新增配送模板'
            this.tplLayer.show = true
            if (index) {
                var _thisTplObj = this.distributionList[index]
                this.tplLayer.inputName = _thisTplObj.name
                this.tplLayer.inputDesc = _thisTplObj.desc
                this.tplLayer.radioType = _thisTplObj.type
                this.setLimitCheckList(_thisTplObj.limitAreaList)
            }
            else {
                this.tplLayer.inputName = ''
                this.tplLayer.inputDesc = ''
                this.tplLayer.radioType = 1
            }
            this.limitDefault()
        },
        limitDefault(){
            let _check = []
            this.localAllCity.provinceList.forEach((item) => {
                let _opts = {
                    id: item.provinceId,
                    label: item.name,
                    type:'provinceId',
                    provinceId:item.provinceId,
                    cityId:'',
                    districtId:'',
                    children:[
                        {
                            id:item.provinceId+'111',
                            label:item.name,
                            type:'none'
                        },
                        {
                            id:item.provinceId+'222',
                            label:item.name,
                            type:'none'
                        }
                    ],
                }
                this.limitData.push(_opts)

            if(this.limitCheckList.province.includes(item.provinceId)){
                _check.push(item.provinceId)
                _check.push(item.provinceId+'111')
                _check.push(item.provinceId+'222')
            } else if(this.checkMapAreaLength[item.provinceId]){
                _check.push(item.provinceId+'111')
            }
        })
            this.setCheckLimitArea(_check)
        },
        mockData(){
            let _list = [
                {
                    provinceCode:'110000',
                    cityCode:'110100',
                    districtCode:'110228'
                },
                {
                    provinceCode:'110000',
                    cityCode:'110100',
                    districtCode:'110229'
                },
//          {
//            provinceCode:'110000',
//            cityCode:'110100',
//            districtCode:'110230'
//          }
            ]
            var _len = new Array(17).fill(1)
            _len.map((item,idx)=>{
                let _code = '1101' + (idx < 9 ? '0' : '') + (idx+1)
                if(idx != 9){
                let _opts = {
                    provinceCode:'110000',
                    cityCode:'110100',
                    districtCode:_code
                }
                _list.push(_opts)
            }

        })
            return _list
        },
        setLimitCheckList(rs){
//        let list = this.mockData()
            let list = rs
            list.forEach((item) => {
                //已选择 的 省份 计数
                if (!this.checkMapAreaLength[item.provinceCode]) {
                this.checkMapAreaLength[item.provinceCode] = 1
                this.indeterminateArea[item.provinceCode] = [item.cityCode]
            } else {
                this.checkMapAreaLength[item.provinceCode]++
                if(!this.indeterminateArea[item.provinceCode].includes(item.cityCode)){
                    this.indeterminateArea[item.provinceCode].push(item.cityCode)
                }
            }
            //已选择 的 城市 计数
            if (!this.checkMapAreaLength[item.cityCode]) {
                this.checkMapAreaLength[item.cityCode] = 1
                this.indeterminateArea[item.cityCode] = [item.districtCode]
            } else {
                this.checkMapAreaLength[item.cityCode]++
                if(!this.indeterminateArea[item.cityCode].includes(item.districtCode)){
                    this.indeterminateArea[item.cityCode].push(item.districtCode)
                }
            }
            //选择的 区
            this.limitCheckList.district.push(item.districtCode)
        })
            for (let i in this.checkMapAreaLength) {
                // 选择的 省
                if (this.checkMapAreaLength[i] == this.mapProvinceAreaLength[i]) {
                    this.limitCheckList.province.push(i)
                }
                // 选择 的 市
                if (this.mapCityAreaLength[i] && this.checkMapAreaLength[i] == this.mapCityAreaLength[i].len) {
                    this.limitCheckList.city.push(i)
                }
//          if(this.mapProvinceAreaLength[i]){
//            console.log(i,this.checkMapAreaLength[i],this.mapProvinceAreaLength[i])
//          }
//          if(this.mapCityAreaLength[i]){
//            console.log(i,this.checkMapAreaLength[i],this.mapCityAreaLength[i].len)
//          }

            }

//        console.log(this.limitCheckList.city)
        },
        nodeExpand(data, node){
            let id = data.id,
                _level = node.level,
                _checked = node.checked,
                _indeterminate = node.indeterminate
            // 已经展开 back
            if (this.mapLimitData[id]) return
            this.mapLimitData[id] = true
            // 市 区 对应map
            let _levelMap = {
                1: {
                    idLabel: 'cityId',
                    fetchLabel: 'cityList',
                    perIdLabel: 'provinceId'
                },
                2: {
                    idLabel: 'districtId',
                    fetchLabel: 'districtList',
                    perIdLabel: 'cityId'
                }
            }
            let configLevel = _levelMap[_level]
            let _list = [], selectId = []
            this.localAllCity[configLevel.fetchLabel].filter(item => item[configLevel.perIdLabel] == id).forEach((item) => {
                let _opts = {
                    id: item[configLevel.idLabel]+'',
                    label: item.name,
                    provinceId: item.provinceId || '',
                    cityId: item.cityId,
                    districtId: item.districtId || '',
                    type: configLevel.idLabel
                }
                if (_level < 2) {
                _opts.children = [
                    {
                        id: item[configLevel.idLabel] + '111',
                        label: item.name,
                        type: 'none'
                    },
                    {
                        id: item[configLevel.idLabel] + '222',
                        label: item.name,
                        type: 'none'
                    }
                ]
            }
            // 父 选择
            if (_checked) {
                selectId.push(item[configLevel.idLabel])
            }
            // 父 未选择 但是有子元素选择
            else if (_indeterminate) {
                if (this.limitCheckList.city.includes(item[configLevel.idLabel])) {
                    selectId.push(item[configLevel.idLabel])
                    selectId.push(item[configLevel.idLabel]+'111')
                    selectId.push(item[configLevel.idLabel]+'222')
                } else if (this.checkMapAreaLength[item[configLevel.idLabel]]) {
                    selectId.push(item[configLevel.idLabel] + '111')
                }
                if (this.limitCheckList.district.includes(item[configLevel.idLabel])) {
                    selectId.push(item[configLevel.idLabel])
                }
            }
            _list.push(_opts)
        })
//        console.log(selectId)
            data.children = _list
            this.setCheckLimitArea(selectId)
        },
        nodeCollapse(data, node){
        },
        checkChange(data){

        },
        nodeClick(data,node){},
        setCheckLimitArea(list){
            if (!list.length) return;
            this.$nextTick(() => {
                let _checkList = this.$refs.tree.getCheckedKeys().concat(list)
                this.$refs.tree.setCheckedKeys(_checkList);
        })
        },
        loadLimit(node,resolve){
            if (node.level === 0) {
                return resolve(this.limitData);
            }
            let configLevel = {
                    idLabel:'',
                    fetchLabel:'',
                    perIdLabel:''
                },
                id = node.data.id
            if (node.level === 1) {
                configLevel.fetchLabel = 'cityList'
                configLevel.idLabel = 'cityId'
                configLevel.perIdLabel = 'provinceId'
            } else if (node.level === 2) {
                configLevel.fetchLabel = 'districtList'
                configLevel.idLabel = 'districtId'
                configLevel.perIdLabel = 'cityId'
            } else {
                return resolve([]);
            }



            let _limitData = []
            this.localAllCity[configLevel.fetchLabel].filter(item=>item[configLevel.perIdLabel] == id).forEach((item)=>{
                let _opts = {
                    id: item[configLevel.idLabel],
                    label: item.name,
                }
                _limitData.push(_opts)
        })
            return resolve(_limitData);

        },
        cancelTpl(){
            this.tplLayer.show = false
            this.limitData = []
            this.mapLimitData = {}
            this.limitCheckList = {
                province:[],
                city:[],
                district:[]
            }
            this.checkMapAreaLength = {}
            this.indeterminateArea = {}
        },
        deleteTpl(index){
            this.index = index
            this.distributionListName = this.distributionList[index].name
            this.dialogVisible = true
        },
        saveTpl(){
            var limitAreaList = []
            if (!this.tplLayer.inputName) {
                this.getNotice('请输入运费模板名称')
                return false
            }
            if (!this.tplLayer.inputDesc) {
                this.getNotice('请输入运费模板描述')
                return false
            }
            limitAreaList = this.changeSelectCodeToList(this.$refs.tree.getCheckedKeys())

//        return false

            const opts = {
                id: this.index === null ? '' : this.distributionList[this.index].id,
                name: this.tplLayer.inputName,
                desc: this.tplLayer.inputDesc,
                type: this.tplLayer.radioType,
                limitAreaList: limitAreaList,
                exceptAreaList: []
            }


            this.saveDeliverTpl(opts)
                .then(() => {
                this.callGetDistributionTemplate()
            this.cancelTpl()
        })
        },
        changeSelectCodeToList(list){
//           //xx0000 省份
//          // xxxx00 市
//          // xx0000xxx 省份半选
//          // xxxx00xxx 市半选
            let indeterminate = [],
                districtList = [],
                cityList = [],
                provinceList = []
            for (let i = 0, j = list.length; i < j; i++) {
                let item = list[i]
                if (item.length > 6) {
                    let _item = item.replace(/\d{3}$/, '')
                    if(_item.match(/0000$/g)){
                        indeterminate = indeterminate.concat(this.indeterminateArea[_item])
                    } else {
                        indeterminate.push(_item)
                    }
                    continue;
                }
                let _zeo = item.match(/(0+)$/g)
                let type = _zeo ? _zeo[0] : '0'
                switch (type) {
                    case '0':
                        districtList.push(item)
                        break;
                    case '00':
                    case '000':
                        cityList.push(item)
                        break;
                    case '0000':
                        provinceList.push(item)
                        break;
                }
            }
//        console.log('i',indeterminate)
//        console.log('d',districtList)
//        console.log('c',cityList)
//        console.log('p',provinceList)
//        return false
            indeterminate.forEach((item)=>{
                if(this.indeterminateArea[item]){
                districtList = districtList.concat(this.indeterminateArea[item])
            }
        })
            provinceList.forEach((item)=>{
                let _sub = item.substr(0,2)
                var re =new RegExp('\^' +_sub+'\\d{4}','g');
            cityList = cityList.filter((code)=>{
                    return !code.match(re)
                })
            districtList = districtList.filter((code)=>{
                    return !code.match(re)
                })
        })
            cityList.forEach((item)=>{
                let _sub = item.substr(0,4)
                var re =new RegExp('\^' +_sub+'\\d{2}','g');
            districtList = districtList.filter((code)=>{
                    return !code.match(re)
                })
        })
            let _limitList = []

            districtList.forEach((item)=>{
                let _opts = {
                    provinceCode:this.mapAllArea[this.mapAllArea[item]],
                    cityCode:this.mapAllArea[item],
                    districtCode:item
                }
                _limitList.push(_opts)
        })

            this.localAllCity.districtList.forEach((item)=>{
                if(cityList.includes(item.cityId) || provinceList.includes(item.provinceId)){
                let _opts = {
                    provinceCode:item.provinceId,
                    cityCode:item.cityId,
                    districtCode:item.districtId
                }
                _limitList.push(_opts)
            }
        })

//        console.log('d',districtList)
//        console.log('c',cityList)
//        console.log('p',provinceList)
//
//        console.log('limit',_limitList)
            return _limitList

        },
        confirmDelete(){
            this.deleteDeliverTpl({
                templateId: this.distributionList[this.index].id
            }).then(() => {
                this.callGetDistributionTemplate()
            this.dialogVisible = false
        })
        },
        getNotice(msg){
            const notice = {
                isShow: true,
                msg: msg,
            }
            this.callSetNotice(notice)
        },
    }
    }
</script>
<style lang='less' rel="stylesheet/less" scoped>
    .block-item-loading{
        text-align: center;
        line-height: 400px;
        font-size: 30px;
    }
    .slide-fade-enter, .slide-fade-leave-to {
        transform: translateX(60px);
        opacity: 1;
    }

</style>
