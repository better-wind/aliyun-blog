/**
 * Created by wjf55 on 2016/9/10.
 */
import React,{ Component } from 'react';
import {render} from 'react-dom';

import {BannerModule} from './banner'

import {ProductModule} from './product';

let count = 1;
let url = '/WebTry/WYSIWYG/web_framework/reactXq/dev/data/product.json';
render(
    <BannerModule  count={count} />,
    document.getElementById('bannerWrap')
)
render(
    <ProductModule ajaxurl={url} />,
    document.getElementById('listWrap')
);