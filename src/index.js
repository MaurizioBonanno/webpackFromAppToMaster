import component from './component';
import "./main.css";
import "react";
import "react-dom";
import { bake } from './shake';

document.body.appendChild(component());

bake();