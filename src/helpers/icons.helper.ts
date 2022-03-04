
import access from "../img/icons/access.png";
import excel from "../img/icons/excel.png";
import onenote from "../img/icons/onenote.png";
import point from "../img/icons/point.png";
import publisher from "../img/icons/publisher.png";
import word from "../img/icons/word.png";
import none from "../img/icons/no.png";

interface Iicon{
    icon: any,
    extenciones: string[],
}

const i1: Iicon = {icon:excel, extenciones: ["xlsx","xlsm","xlsb","xltx"]};
const i2: Iicon = {icon:word, extenciones: ["docx","docm","dotx","dotm"]};
const i3: Iicon = {icon:point, extenciones: ["pptx","pptm","ppt","pdf"]};
const i4: Iicon = {icon:onenote, extenciones: ["onetoc","one","onetmp","onepkg","onebin","onecache"]};
const i5: Iicon = {icon:access, extenciones: ["ACCDC","MDE","DBF","XLSX", "MDB","accdb"]};
const i6: Iicon = {icon:publisher, extenciones: ["BDR","CAG","PUB","PUZ","WIZ","WPS","PUBHTML","PUBMHTML"]};
const i7: Iicon = {icon: none, extenciones:["ALL"]}


const icons = [i1,i2,i3,i4,i5,i6,i7];

export default icons;