/*
* 向量表示
*/
function Vector (x,y) {
	this.x=x||0;
	this.y=y||0;
}

//重置
Vector.prototype.reset=function (x,y) {
	this.x=x;
	this.y=y;
}
//复制
Vector.prototype.clone=function () {
	return new Vector(this.x,this.y);
}
//判断是否相等
Vector.prototype.equals=function (obj) {
	return this.x==obj.x&&this.y==obj.y;
}
//向量相加
Vector.prototype.plus=function (obj) {
	this.x+=obj.x;
	this.y+=obj.y;
}
//向量相加并返回新对象
Vector.prototype.plusNew=function (obj) {
	var n=new Vector();
	n.x=this.x+obj.x;
	n.y=this.y+obj.y;
	return n;
}
//向量相减
Vector.prototype.minus=function (obj) {
	this.x-=obj.x;
	this.y-=obj.y;
}
//向量相减并返回新对象
Vector.prototype.minusNew=function (obj) {
	var n=new Vector();
	n.x=this.x-obj.x;
	n.y=this.y-obj.y;
	return n;
}
//求反
Vector.prototype.negate=function () {
	this.x=-this.x;
	this.y=-this.y;
}
//求反并返回新对象
Vector.prototype.negateNew=function () {
	return new Vector(-this.x,-this.y);
}
//缩放
Vector.prototype.scale=function (f) {
	this.x*=f;
	this.y*=f;
}
//缩放并返回新对象
Vector.prototype.scaleNew=function (f) {
	return new Vector(this.x*f,this.y*f);
}
//获取向量长度
Vector.prototype.getLength=function () {
	var len=Math.sqrt(this.x*this.x+this.y*this.y);
	return len;
}
//设置向量的长度
Vector.prototype.setLength=function (nl) {
	var cl=this.getLength();
	if(cl){
		this.scale(nl/cl);
	}else{
		this.x=len;
	}
}
//获取向量的角度
Vector.prototype.getAngle=function () {
	return Math.atan2(this.y,this.x);//返回-PI到PI之间的值，注意y在前面的
}
//设置向量的角度---就是设置x,y
Vector.prototype.setAngle=function (angle) {
	var len=this.getLength();
	this.x=len*Math.cos(angle);//参数都是弧度为单位的
	this.y=len*Math.sin(angle);
}
//旋转向量---如果只传入一个参数，则为旋转的弧度；如果传入两个参数，则分别为cos和sin值
Vector.prototype.rotate=function () {
	var cos,sin;
	if(arguments.length==1){
		cos=Math.cos(arguments[0]);
		sin=Math.sin(arguments[0]);
	}else{
		cos=arguments[0];
		sin=arguments[1];
	}
	//设向量OP的长度为r，其辐角为φ，则其可表示为OP(r cos(φ), r sin(φ))，这样其旋转θ后的向量就可表示为OP'(r cos(φ + θ), r sin(φ + θ))，由三角函数的合角公式即可得到OP'(x cos(θ) - y sin(θ), x sin(θ) + y cos(θ))。
	var nx=this.x*cos-this.y*sin;
	var ny=this.x*sin+this.y*cos;
	this.x=nx;
	this.y=ny;
}
//旋转并返回新对象
Vector.prototype.rotateNew=function (angle) {
	var res=new Vector(this.x,this.y);
	res.rotate(angle);
	return res;
}
//向量相乘
Vector.prototype.dot=function (obj) {
	return this.x*obj.x+this.y*obj.y;
}
//求法向量
Vector.prototype.getNormal=function () {
	return new Vector(-this.y,this.x);//或new Vector(this.y,-this.x)
}
//判断是否垂直
Vector.prototype.isPerpTo=function (obj) {
	return (this.dot(obj)==0);
}
//获得向量的夹角
Vector.prototype.angleBetween=function (obj) {
	var dp=this.dot(obj);
	var cosVal=dp/(this.getLength()*obj.getLength());
	return Math.acos(cosVal);
}
// 对称
Vector.prototype.symmetryNew=function (dir,parallel) {
	if(arguments.length==1){
		var r=this.getClone();
		dir==="x"?(r.x=-r.x):(r.y=-r.y);//关于哪个轴对称
		return r;
	}else if(arguments.length==2){
		//dir:原向量，parallel:与之平行的向量
		var resX=1,
			resY=0;
		resY=dir.y-parallel.y*(dir.x-resX)/parallel.x;
		return new Vector(resX,resY);
	}
}