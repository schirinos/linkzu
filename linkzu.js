/**********************************************************************
Linkzu 1.23 - Copyright (C) 2005 Sigfrido Chirinos

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA
**********************************************************************/

//init global variables
var linkzulinks = new Array();
var linkzulinksbase = new Array();

/*===========================
function to build linkzu box
============================*/
function linkzubox(atags){
var linkzudiv;
var linkzulogo;
var linkzuanchor;
var linkzuatext;
var anchorsplit;
var newanchor;
var newli;
var atext;

	//split anchors into array
	anchorsplit = atags.split(";");

	//create main linkzu ul
	linkzudiv = document.createElement("ul");	
	linkzudiv.setAttribute("id", "linkzu");
	linkzudiv.style.display = "none";
	linkzudiv.style.position = "absolute";

	//attach linkzu ul to document body
	document.body.appendChild(linkzudiv);	

	//create anchors to fill links ul
	for (var i=0;i<anchorsplit.length;i++){
		if (anchorsplit[i] != "" ){
			linkzuanchor = anchorsplit[i].split(",");
			newli = document.createElement("li");
			newanchor = document.createElement("a");
			newanchor.className = "linkzulink";
			newanchor.href = linkzuanchor[0] + linkzuanchor[3] + "=";
			newanchor.target = "_blank";
			newanchor.style.display = "block";
			atext = document.createTextNode(linkzuanchor[1]);
			newanchor.appendChild(atext);
			newli.appendChild(newanchor);
			linkzudiv.appendChild(newli);
			linkzulinksbase[i] = linkzuanchor[0] + linkzuanchor[3] + "=";
			linkzulinks[i] = newanchor;
			newanchor = "";
			atext = "";
			linkzuanchor = "";
		}		
	}//end for

}//end linkzubox function


/*=========================
function to show link box
===========================*/
function linkzushow(e){
	var linkzulist;
	var wbound;
	var hbound;
	var linkzuwidth;
	var linkzuheight;


	//get link box element
	linkzulist = document.getElementById("linkzu");


	//get window boundaries
	if (self.innerWidth || self.innerHeight){
		wbound = self.innerWidth;
		hbound = self.innerHeight;
	}	
	else if (document.documentElement.clientWidth || document.documentElement.clientHeight){
		wbound = document.documentElement.clientWidth;
		hbound = document.documentElement.clientHeight;
	}
	else if (document.body.clientWidth || document.body.clientHeight){
		wbound = document.body.clientWidth;
		hbound = document.body.clientHeight;
	}
	else if (window.innerWidth || window.innerHeight){
		wbound = window.innerWidth;
		hbound = window.innerHeight;
	}

	//display link box	
	if (linkzugettext() != ""){
		//page scrolled check
		if (self.pageYOffset){
			linkzulist.style.display = "block";
			if ((wbound - e.clientX) < (linkzulist.clientWidth+30)) {
				leftpos = (e.clientX + self.pageXOffset) - (linkzulist.clientWidth + 30);
				linkzulist.style.left = leftpos+"px";				
			}
			else {
				leftpos = e.clientX + self.pageXOffset;
				linkzulist.style.left = leftpos+"px";
			}
			if (e.clientY > hbound){
				toppos = e.clientY - 20;
				linkzulist.style.top = toppos+"px";			
			}
			else if ((hbound - e.clientY) < linkzulist.clientHeight){
				toppos = (e.clientY + self.pageYOffset) - (linkzulist.clientHeight + 30);
				linkzulist.style.top = toppos+"px";
			}
			else {
				toppos = e.clientY + self.pageYOffset;
				linkzulist.style.top = toppos+"px";
			}
		}
		else if (document.documentElement.scrollTop){
			linkzulist.style.display = "block";
			if ((wbound - e.clientX) < (linkzulist.clientWidth+30)) {
				leftpos = (e.clientX + document.documentElement.scrollLeft) - (linkzulist.clientWidth + 30);
				linkzulist.style.left = leftpos+"px";				
			}
			else {
				leftpos = e.clientX + document.documentElement.scrollLeft;
				linkzulist.style.left = leftpos+"px";
			}
			if ((hbound - e.clientY) < linkzulist.clientHeight){				
				toppos = (e.clientY + document.documentElement.scrollTop) - (linkzulist.clientHeight + 30);
				linkzulist.style.top = toppos+"px";
			}
			else {
				toppos = e.clientY + document.documentElement.scrollTop;
				linkzulist.style.top = toppos+"px";
			}
		}
		else if (document.body.scrollTop){
			linkzulist.style.display = "block";
			if ((wbound - e.clientX) < (linkzulist.clientWidth+30)) {
				leftpos = (e.clientX + document.body.scrollLeft) - (linkzulist.clientWidth + 30);
				linkzulist.style.left = leftpos+"px";				
			}
			else {
				leftpos = e.clientX + document.body.scrollLeft;
				linkzulist.style.left = leftpos+"px";
			}
			if ((hbound - e.clientY) < linkzulist.clientHeight){
				toppos = (e.clientY + document.body.scrollTop) - (linkzulist.clientHeight + 30);
				linkzulist.style.top = toppos+"px";
			}
			else {
				toppos = e.clientY + document.body.scrollTop;
				linkzulist.style.top = toppos+"px";
			}
		}
		//end page scrolled check
		//page not scrolled
		else if (e.pageX || e.pageY){
			linkzulist.style.display = "block";
			if ((wbound - e.clientX) < linkzulist.clientWidth) {
				leftpos = (e.pageX) - (linkzulist.clientWidth + 30);
				linkzulist.style.left = leftpos+"px";			
			}
			else {
				linkzulist.style.left = e.pageX+"px";
			}
			if ((hbound - e.clientY) < linkzulist.clientHeight){
				toppos = (e.pageY) - (linkzulist.clientHeight + 30);
				linkzulist.style.top = toppos+"px"
			}
			else {
				linkzulist.style.top = e.pageY+"px";
			}			
		}
		else {
			linkzulist.style.display = "block";
			if ((wbound - e.clientX) < linkzulist.clientWidth) {
				linkzulist.style.top = e.clientY+"px";;
				leftpos = (e.clientX) - (linkzulist.clientWidth + 30);				
				linkzulist.style.left = leftpos+"px";
			}
			else {
				linkzulist.style.top = e.clientY+"px";;
				linkzulist.style.left = e.clientX+"px";;
			}
			if ((hbound - e.clientY) < linkzulist.clientHeight){
				toppos = (e.clientY) - (linkzulist.clientHeight + 30);
				linkzulist.style.top = toppos+"px";
			}
			else {
				linkzulist.style.top = e.clientY+"px";
			}
		}
		//end page not scrolled
		//update anchors
		for (var i=0;i<linkzulinks.length;i++){
			linkzulinks[i].href = linkzulinksbase[i] + linkzugettext();
		}//end for

	}//end if

}//end linkzushow function


/*==============================
function to get selected text
===============================*/
function linkzugettext(){
	var seltxt;
	if (document.getSelection){
		seltxt = document.getSelection();
	}
	else if (document.selection) {
		seltxt  = document.selection.createRange().text;
	}
	else if (window.getSelection) {
		seltxt = window.getSelection();
	}
	else {
		seltxt = "";
	}
	return seltxt
}//end linkzugettext function


/*==========================
function to hide link box
============================*/
function linkzuhide(e){
	var linkzulist;

	//get link box element
	linkzulist = document.getElementById("linkzu");
	if (linkzugettext() == ""){
		linkzulist.style.display = "none";
	}
}//end function
