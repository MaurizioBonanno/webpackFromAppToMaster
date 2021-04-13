import component from './component';
import "./main.css";
import "react";
import "react-dom";
import { bake } from './shake';
import * as THREE from '../node_modules/three/build/three.module';
document.body.appendChild(component());

bake();