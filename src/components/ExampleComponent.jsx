// @flow
import React, { Component } from 'react';

type Props = {
  sampleProp: string,
};

export default class ExampleComponent extends Component<Props> {
  props: Props;

  constructor(props: Props) {
    super(props);

    const { sampleProp } = props;

    this.state = {
      sampleProp,
    };
  }

  render() {
    const { sampleProp } = this.state;

    return (
      <div>
        {'My sample prop is: '}
        {sampleProp}
      </div>
    );
  }
}
