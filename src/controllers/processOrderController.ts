import { Response,Request } from "express";
import Order from "../models/orderSchema";
import axios from "axios"
import sharp from "sharp"
import { createCanvas , loadImage , Canvas } from "canvas";
import * as path from "path"
import * as fs from "fs"
import os from "os"
import { translateSizing } from "../constants/translateSizing";
import { Storage } from "@google-cloud/storage";
import "dotenv/config"
import config from '../config/googleCloudStorage';

