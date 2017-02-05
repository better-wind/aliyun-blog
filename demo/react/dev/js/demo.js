import React from 'react';
import { render } from 'react-dom';

class BannerModule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.count,
        };
    }

    trick =() => {
        this.setState({
            count: this.state.count + 1,
        });
    }
    render() {
        return (
            <section className="banner-list-module" onClick={this.trick}>
                {this.state.count}
            </section>
        );
    }
}
BannerModule.propTypes = {
    count: React.PropTypes.number.isRequired,
};
// BannerModule.defaultProps = {
//     count: 1,
// };
const count = 1;
render(
    <BannerModule count={count} />
    , document.getElementById('bannerWrap')
);
