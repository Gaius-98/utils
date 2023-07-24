export interface dragResizeProps {
  nodeKey?:string|number,
  minh?:number,
  minw?:number,
  disabled?:boolean|string,
  width?:number,
  height?:number,
  top?:number,
  left?:number,
}

export interface dragResizeData{
  width:string,
  height:string,
  top:string,
  left:string,
  nodeKey:number|string
}