//cac bien chung
var xmlDoc;

//load mot file XML
function loadXML(tenFile)
{
	xmlDoc = new ActiveXObject("MSXML.DOMDocument");
	xmlDoc.async = false;
	xmlDoc.load(tenFile);
}
function loadXML_FF(tenFile,myObject)
{
	xmlDoc = document.implementation.createDocument("", "", null);
	xmlDoc.load(tenFile);
	xmlDoc.onload = function(){
								myObject.DocThongTinMenu("TopLevel");
							  }
}
function LayTenCuaMenuTiepTheo(viTriChon, tenMenuChinh)
{
	var tenMenuKQ = "";
	var oNodeList;
	oNodeList = xmlDoc.getElementsByTagName('Menu');
	for (var i=0;i<oNodeList.length;i++)
	{	
		var node = oNodeList.item(i);
		if (node.attributes.getNamedItem('ten').nodeValue == tenMenuChinh)
		{
			tenMenuKQ = node.childNodes(viTriChon).attributes.getNamedItem('MenuTiepTheo').nodeValue;
			break;
		}
	}
	return tenMenuKQ;
}
function LayTenCuaMenuTiepTheo_FF(viTriChon, tenMenuChinh)
{
	var tenMenuKQ = "";
	var oNodeList;
	oNodeList = xmlDoc.getElementsByTagName('Menu');
	for (var i=0;i<oNodeList.length;i++)
	{	
		var node = oNodeList[i];
		
		if (node.attributes.getNamedItem('ten').nodeValue == tenMenuChinh)
		{
			tenMenuKQ = node.getElementsByTagName("MenuCon")[viTriChon].attributes.getNamedItem('MenuTiepTheo').nodeValue;
			break;
		}
	}
	return tenMenuKQ;
}
