// @flow
import { hot } from 'react-hot-loader';
import React, { Component, Fragment } from 'react';
import type { Node } from 'react';
import ExampleComponent from './ExampleComponent';

type Props = {};

export default hot(module)(
  class CivilMaps extends Component<Props> {
    props: Props;

    constructor(props: Props) {
      super(props);
      this.state = {};
    }

    componentDidMount = () => {
      // use jquery calls here
    };

    render(): Node {
      return (
        <Fragment>
          <ExampleComponent sampleProp="This is where Civil Maps stuff should go." />
        </Fragment>
      );
    }
  }
);
