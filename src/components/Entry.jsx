// @flow
import React from 'react';
import { render } from 'react-dom';
import CivilMaps from './CivilMaps';
import '../styles/style.css';

const htmlRoot = document.getElementById(process.env.REACT_ROOT);
render(<CivilMaps />, htmlRoot);
