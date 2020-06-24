
function ManHinhDK(tableHienThi,ThTin)
{
	logic = 0;
	solan =0;
	x = 0;
	this.myTable = tableHienThi;
	this.myTable2 = ThTin;
	//cac bien ho tro cho viec luu thong tin tu file XML
	this.menuTruoc ="";
	this.menuHienTai ="";
	this.mangThongTinMenu = new Array(); 
	this.mangTrangThaiMenu = new Array(); //mang dung de luu trang thai cua menu la co cho de menu tiep theo hay khong
	this.soMenu =0;
	this.soThuocTinh = 0; //so thuoc tinh cua mot menu
	
	//cac bien phuc vu cho cac cong viec hien thi
	this.cachCanLe ="Left";
	this.dongHienTai=0;
	this.dongHienTaiCuaMenuTruoc = 0;
	this.dongDauDangHienThi =0;
	this.dongCuoiDangHienThi = 8;
	
	//cac bien phuc vu cho viec cap nhat
	//o muc menu
	this.dangMenu =1; // co 3 dang: 
					  //1- Dang thuong, hien thi be trai, chon duoc de den menu tiep theo;
					  //2- Dang menu co cho thay doi gia tri
					  //3-Dang menu QuickRead
	this.mucDangNhap ="Read";//Read: chi doc; Setting: Thay doi gia tri
	this.duocCapNhat ="NO";
	this.laMenuCuoi ="NO";
	
	//o muc vi tri cap nhat
	this.viTriCapNhat=0;
	this.soPhanTuCapNhat=0;
	this.mangViTriCapNhat = new Array(); // cac vi tri cho phep cap nhat tren bang
	this.mangGiaTriCanCapNhat = new Array(); //cac gia tri dang cap nhat tuong ung voi cac vi tri
	this.mangGiaTriMaxTuongUngTheoViTri = new Array(); //gia tri max cho phep dat toi, tuong ung voi cac vi tri
	this.mangGiaTriMinTuongUngTheoViTri = new Array(); //gia tri min cho phep dat toi tuong ung voi cac vi tri

	//phuc vu cho viec tao nhap nhay
	this.state = 0;
	this.timeID="";
	

	//cac bien phuc vu cho viec doc QuickRead
	this.menuQuickReadHienTai =1;
	
	//===========================================danh sach cac ham===================================================================
	this.InitArray = InitArray;
	this.DocThongTinMenu = DocThongTinMenu;
	this.DocThongTinMenuTruoc = DocThongTinMenuTruoc;
	this.DocQuickRead = DocQuickRead;
	
	this.HienThiThongTin = HienThiThongTin;
	this.wink = wink;
	
	this.xulyNut0 = xulyNut0;
	this.xulyNut1 = xulyNut1;
	this.xulyNut2 = xulyNut2;
	this.xulyNut3 = xulyNut3;
	this.xulyNut4 = xulyNut4;
	this.xulyNut5 = xulyNut5;
	this.xulyNut6 = xulyNut6;
	this.xulyNut7 = xulyNut7;
	this.xulyNut8 = xulyNut8;
	this.xulyNut9 = xulyNut9;
	this.xulyNutA = xulyNutA;
	this.xulyNutB = xulyNutB;
	this.xulyNutF = xulyNutF;
	this.xuLyENTER = xuLyENTER;
	
	this.xulyPREV = xulyPREV;
	this.xulyNEXT = xulyNEXT;
	this.xuLyNutCong = xuLyNutCong;
	this.xuLyNutTru = xuLyNutTru;
	this.xuLyQuickRead = xuLyQuickRead;
}
//========================================================xu ly XML==========================================
//day la file javascript dung de doc thong tin tu XML
function InitArray()
{
	this.soMenu =0;
	this.dongDauDangHienThi =0;
	this.dongCuoiDangHienThi = 8;
	
}


function DocThongTinMenuTruoc(tenMenu)
{
	if(tenMenu!='')
	{
		var oNodeList;
		var i,j;
		oNodeList = xmlDoc.getElementsByTagName('Menu');
		//tim trong file XML co menu nao co ten nhu tren hay khong
		var node;
		for (i=0;i<oNodeList.length;i++)
		{	
			node = oNodeList.item(i);
		
			if (node.attributes.getNamedItem('ten').nodeValue == tenMenu)
				break;
		}
		//neu tim khong ra thi thoat luon
		if (i==oNodeList.length)
			return;
		//tim ra
		//khoi tao lai Array Chuoi
		this.InitArray();
		this.dangMenu =1;
		//luu lai ten menu cha
		this.menuTruoc = node.attributes.getNamedItem('Parent').nodeValue;
		this.tenhienthi = node.attributes.getNamedItem('tenht').nodeValue;
		this.laMenuCuoi = node.attributes.getNamedItem('LaMenuCuoi').nodeValue;
		//lay trang thai cua menu dang duoc chon, xem do co phai la menu co duoc cap nhat hay khong
		var trangThaiUpdate = node.attributes.getNamedItem('CoUpdate').nodeValue;
		if (this.mucDangNhap =='Setting' && trangThaiUpdate =='YES')
		{
			this.duocCapNhat = "YES";
			this.dangMenu =2;
			this.soPhanTuCapNhat =0;
		}
		else
			this.duocCapNhat = "NO";
		//lay tat ca cac menu con cua no ra
		this.soThuocTinh = parseInt(node.attributes.getNamedItem('NumberOfProperties').nodeValue);
		this.cachCanLe = node.attributes.getNamedItem('CanhVanBan').nodeValue;
		this.dongHienTaiCuaMenuTruoc = 0;
		for (j=0;j<node.childNodes.length;j++) //se la cac dong trong mang 2 chieu
		{
			var dsThuocTinh = node.childNodes(j).attributes;
			if (dsThuocTinh.getNamedItem('MenuTiepTheo').nodeValue==this.menuHienTai)
				this.dongHienTaiCuaMenuTruoc = j;
			if (this.soThuocTinh == 0)
			{
				this.mangThongTinMenu[j] = dsThuocTinh.getNamedItem('ten').nodeValue;
			}
			if (this.soThuocTinh ==1)
			{
				this.mangThongTinMenu[j*2] = dsThuocTinh.getNamedItem('ten').nodeValue;
				this.mangThongTinMenu[j*2+1] = node.childNodes(j).childNodes(0).attributes.getNamedItem('value').nodeValue;
			}
			if (this.soThuocTinh == 2)
			{
				this.mangThongTinMenu[j*3] = dsThuocTinh.getNamedItem('ten').nodeValue;
				this.mangThongTinMenu[j*3+1] = node.childNodes(j).childNodes(0).attributes.getNamedItem('value').nodeValue;
				this.mangThongTinMenu[j*3+2] = node.childNodes(j).childNodes(1).attributes.getNamedItem('value').nodeValue;
				
				if (this.duocCapNhat =="YES" && dsThuocTinh.getNamedItem('IsAllowUpdate').nodeValue=="YES" )
				{
					this.mangViTriCapNhat[this.soPhanTuCapNhat] = j*3+1;
					this.mangGiaTriCanCapNhat[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(0).attributes.getNamedItem('value').nodeValue;
					this.mangGiaTriMaxTuongUngTheoViTri[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(0).attributes.getNamedItem('Max').nodeValue;
					this.mangGiaTriMinTuongUngTheoViTri[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(0).attributes.getNamedItem('Min').nodeValue;
					
					this.soPhanTuCapNhat +=1;
					
					this.mangViTriCapNhat[this.soPhanTuCapNhat] = j*3+2;
					this.mangGiaTriCanCapNhat[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(1).attributes.getNamedItem('value').nodeValue;
					this.mangGiaTriMaxTuongUngTheoViTri[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(1).attributes.getNamedItem('Max').nodeValue;
					this.mangGiaTriMinTuongUngTheoViTri[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(1).attributes.getNamedItem('Min').nodeValue;
					
					this.soPhanTuCapNhat +=1;
				}
			}
			//lay trang thai cua cac menu con
			this.mangTrangThaiMenu[this.soMenu] = dsThuocTinh.getNamedItem('MenuTiepTheo').nodeValue;
			this.soMenu +=1;
		}
		/*************************************************************
		day se la bien de luu lai trang thai da dang nhap hay chua cua nguoi dung
		se kiem tra neu : menu Hien tai = 'MainMenu' tuc la chua dang nhap
		neu menu hien tai la 'Password Menu' tuc la da dang nhap
		*************************************************************/
		this.menuHienTai = tenMenu;
		if (this.menuHienTai =='Main Menu')
			this.mucDangNhap ="Read";
		if (this.menuHienTai=='Password Menu')
			this.mucDangNhap ="Setting";
	}
}


function DocThongTinMenu(tenMenu)
{
	if(tenMenu!='')
	{
		var oNodeList;
		var i,j;
		oNodeList = xmlDoc.getElementsByTagName('Menu');
		//tim trong file XML co menu nao co ten nhu tren hay khong
		
		var node;
		for (i=0;i<oNodeList.length;i++)
		{	
			node = oNodeList.item(i);
			if (node.attributes.getNamedItem('ten').nodeValue == tenMenu)
				break;
		}
		//neu tim khong ra thi thoat luon
		if (i==oNodeList.length)
			return;
		//tim ra
		//khoi tao lai Array Chuoi
		this.InitArray();
		this.dangMenu =1;
		//luu lai ten menu cha
		this.menuTruoc = node.attributes.getNamedItem('Parent').nodeValue;
		//alert(this.menuTruoc);
		this.tenhienthi = node.attributes.getNamedItem('tenht').nodeValue;
		this.laMenuCuoi = node.attributes.getNamedItem('LaMenuCuoi').nodeValue;
		//lay trang thai cua menu dang duoc chon, xem do co phai la menu co duoc cap nhat hay khong
		var trangThaiUpdate = node.attributes.getNamedItem('CoUpdate').nodeValue;
		if (this.mucDangNhap =='Setting' && trangThaiUpdate =='YES')
		{
			this.duocCapNhat = "YES";
			this.dangMenu =2;
			this.soPhanTuCapNhat =0;
		}
		else
			this.duocCapNhat = "NO";
		//lay tat ca cac menu con cua no ra
		this.soThuocTinh = parseInt(node.attributes.getNamedItem('NumberOfProperties').nodeValue);
		this.cachCanLe = node.attributes.getNamedItem('CanhVanBan').nodeValue;
		for (j=0;j<node.childNodes.length;j++) //se la cac dong trong mang 2 chieu
		{
			var dsThuocTinh = node.childNodes(j).attributes;
			
			if (this.soThuocTinh == 0)
			{
				this.mangThongTinMenu[j] = dsThuocTinh.getNamedItem('ten').nodeValue;
			}
			if (this.soThuocTinh ==1)
			{
				this.mangThongTinMenu[j*2] = dsThuocTinh.getNamedItem('ten').nodeValue;
				this.mangThongTinMenu[j*2+1] = node.childNodes(j).childNodes(0).attributes.getNamedItem('value').nodeValue;
				
			}
			if (this.soThuocTinh == 2)
			{
				this.mangThongTinMenu[j*3] = dsThuocTinh.getNamedItem('ten').nodeValue;
				this.mangThongTinMenu[j*3+1] = node.childNodes(j).childNodes(0).attributes.getNamedItem('value').nodeValue;
				this.mangThongTinMenu[j*3+2] = node.childNodes(j).childNodes(1).attributes.getNamedItem('value').nodeValue;
								
				if (this.duocCapNhat =="YES" && dsThuocTinh.getNamedItem('IsAllowUpdate').nodeValue=="YES" )
				{
					this.mangViTriCapNhat[this.soPhanTuCapNhat] = j*3+1;
					this.mangGiaTriCanCapNhat[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(0).attributes.getNamedItem('value').nodeValue;
					this.mangGiaTriMaxTuongUngTheoViTri[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(0).attributes.getNamedItem('Max').nodeValue;
					this.mangGiaTriMinTuongUngTheoViTri[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(0).attributes.getNamedItem('Min').nodeValue;
					
					this.soPhanTuCapNhat +=1;
					
					this.mangViTriCapNhat[this.soPhanTuCapNhat] = j*3+2;
					this.mangGiaTriCanCapNhat[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(1).attributes.getNamedItem('value').nodeValue;
					this.mangGiaTriMaxTuongUngTheoViTri[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(1).attributes.getNamedItem('Max').nodeValue;
					this.mangGiaTriMinTuongUngTheoViTri[this.soPhanTuCapNhat] = node.childNodes(j).childNodes(1).attributes.getNamedItem('Min').nodeValue;
					
					this.soPhanTuCapNhat +=1;
				}
			}
			//lay trang thai cua cac menu con
			this.mangTrangThaiMenu[this.soMenu] = dsThuocTinh.getNamedItem('MenuTiepTheo').nodeValue;
			this.soMenu +=1;
		}
		/*************************************************************
		day se la bien de luu lai trang thai da dang nhap hay chua cua nguoi dung
		se kiem tra neu : menu Hien tai = 'MainMenu' tuc la chua dang nhap
		neu menu hien tai la 'Password Menu' tuc la da dang nhap
		*************************************************************/
		this.menuHienTai = tenMenu;
		//if (this.menuHienTai =='Main Menu')
		//	this.mucDangNhap ="Read";
		//if (this.menuHienTai=='Password Menu')
		//	this.mucDangNhap ="Setting";
		
		
	}
}
function DocQuickRead()
{
	//luu lai menu truoc de co the tro ve
	this.menuTruoc = this.menuHienTai;
	this.dangMenu = 3;
	this.soMenu =0;
	var l = xmlDoc.getElementsByTagName('QuickRead');
	for (var i=0; i< l.length;i++)
	{
		var node = l.item(i);
		this.mangThongTinMenu[i*4]   = node.childNodes(0).firstChild.nodeValue;
		this.mangThongTinMenu[i*4+1] = node.childNodes(1).firstChild.nodeValue;
		this.mangThongTinMenu[i*4+2] = node.childNodes(2).firstChild.nodeValue;
		this.mangThongTinMenu[i*4+3] = node.childNodes(3).firstChild.nodeValue;
		this.soMenu+=1;
	}
}

//===========================================xu ly hien thi =================================================
//file nay chua cac lenh dung de hien thi thong tin len man hinh va xu ly hien thi thong tin
//Trong ham HienThiThongTin thi:
//	ta: textarea se hien thi thong tin


function UpdatelaiData(tenmenu,tenmenucon,tenmoi,TTnew)
{

	if(tenmenu!='')
	{
		var oNodeList;
		var i,j;
		oNodeList = xmlDoc.getElementsByTagName('Menu');
		//tim trong file XML co menu nao co ten nhu tren hay khong
		
		var node;
		for (i=0;i<oNodeList.length;i++)
		{	
			node = oNodeList.item(i);
			if (node.attributes.getNamedItem('ten').nodeValue == tenmenu)
				break;
		}
		
		for (j=0;j<node.childNodes.length;j++) 
		{
			var dsThuocTinh1 = node.childNodes(j).attributes;
			if (dsThuocTinh1.getNamedItem('ten').nodeValue == tenmenucon) 
			{
			node.childNodes(j).childNodes(0).attributes.getNamedItem('value').nodeValue = TTnew ;
			dsThuocTinh1.getNamedItem('ten').nodeValue = tenmoi;
			}
		}
	}	
} 

function SetLOCOPER()
  {
	UpdatelaiData("LOC/MAIN" ,"TEST/PROG","","");
	UpdatelaiData("LOC/MAIN" ,"SIGN/DISP"," ","");
	UpdatelaiData("LOC/MAIN" ,"PARA/PRINT","  ","");
	UpdatelaiData("LOC/MAIN" ,"   ","PARA/PROG",": 4");
	UpdatelaiData("LOC/MAIN" ,"PARA/PROG","PARA/PROG",": 4");
  }

function SetLOCMAIN ()
 {
	
	UpdatelaiData("LOC/MAIN" ,"","TEST/PROG",": 6");
	UpdatelaiData("LOC/MAIN" ," ","SIGN/DISP",": 7");
	UpdatelaiData("LOC/MAIN" ,"  ","PARA/PRINT",": 8");
	UpdatelaiData("LOC/MAIN" ,"   ","PARA/PRINT",": 4");
	
	
 }
 function SetREMMAINTREMOPER ()
 {
	UpdatelaiData("LOC/MAIN" ,"TEST/PROG","","");
	UpdatelaiData("LOC/MAIN" ,"SIGN/DISP"," ","");
	UpdatelaiData("LOC/MAIN" ,"PARA/PRINT","  ","");
	UpdatelaiData("LOC/MAIN" ,"PARA/PROG","   ","");
 }

function HienThiThongTin()
{
	//if (this.timeID !="")
	//	clearInterval(this.timeID);
	//bo het tat ca cac dong hien co trong this.myTable
	while (this.myTable.rows.length>0) 
		this.myTable.deleteRow(0);
	while (this.myTable2.rows.length>0) 
		this.myTable2.deleteRow(0);
	
	
	
	
	if ((this.dongDauDangHienThi <= this.dongHienTai) && (this.dongCuoiDangHienThi >= this.dongHienTai))
	{
		//day la truong hop van o trong man hinh co the nhin thay duoc
		if (this.dongCuoiDangHienThi > this.soMenu -1)
			this.dongCuoiDangHienThi = this.soMenu-1;
	}
	if (this.dongHienTai < this.dongDauDangHienThi)
	{
		// tro ve menu truoc
		this.dongDauDangHienThi = this.dongDauDangHienThi-1;
		this.dongCuoiDangHienThi = this.dongCuoiDangHienThi-1;
	}
	if (this.dongHienTai > this.dongCuoiDangHienThi)
	{
		this.dongDauDangHienThi = this.dongDauDangHienThi +1;
		this.dongCuoiDangHienThi = this.dongCuoiDangHienThi+1;
		if (this.dongCuoiDangHienThi > this.soMenu-1)
			this.dongCuoiDangHienThi = this.soMenu-1;
	}
	var i,j;
	var tr, td;
	//hien thi tat ca ra table
	
	// hien thi LOC/MAIN
	
	if (this.menuTruoc == "" )
	{

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	
	td.innerHTML = this.tenhienthi;
	
	
	td = tr.insertCell(3);
	//td.align = "Right"		;
	td.innerHTML = " 0 ";
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
	 for (i=0;i<4;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+4)*2];
			td = tr.insertCell(3);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[(i+4)*2+1];
	 
		}
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "ENTER CODE : ";
	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = " Trang 0 luôn xuất hiện đầu tiên mỗi khi mở máy.<br>Từ trang này truy nhập nhánh menu mong muốn bằng cách nhấn phím số tương ứng. Riêng nhánh 9 được truy nhập bằng cách nhập tổ hợp khoá mã “9FE”.";
	this.laMenuCuoi = "yes";
	
	}
	
	
	
	if (this.soThuocTinh ==0)
	{
		for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi+1;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i];
			if (this.cachCanLe=="Centre")
				td.align = "center";										
		}
	}
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "MODE/PROG 10") 
	{	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(2);
	td.align = "center"		;
	td.innerHTML = "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp " + this.menuHienTai  ;
   
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
		for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi+1 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			td = tr.insertCell(2);
			td.innerHTML = "";
			
		}
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->";	
	td = tr.insertCell(1);
	td.innerHTML = "PRE: <--";	
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(3);
	td.innerHTML = "ENTER CODE:"
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML ="Sử dụng trang này để đặt chế độ làm việc cho TVD 900:<br>- LOC/OPER (Làm việc tại chỗ): nhấn phím 1;<br>- LOC/MAINT (Bảo trì tại chỗ): nhấn phím 2;<br>- REM/OPER (Làm việc từ xa): nhấn phím 1 rồi nhấn phím 3;<br>- REM/MAINT (Bảo trì từ xa): nhấn phím 2 rồi nhấn phím 3."

	
	}
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "PARA/PRINT 80") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(3);
	td.align = "Center"		;
	td.innerHTML = this.menuHienTai + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp " ;

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
		for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi+1 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			td = tr.insertCell(2);
			td.innerHTML = "";
			
		}
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "	Trang này được sử dụng để in từng loại tham số của TVD 900. Nếu muốn in tất cả các tham số nhấn phím “4”.<br>Lưu ý: Máy in được nối với BITE qua đường truyền nối tiếp RS232 với các tham số sau:<br>-Transmission rate	: 9600 bauds;<br>- Word format	: 7 bits;<br>- Parity		: even;<br>- 1 stop bit.<br> "

	
	}
	
	
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "FAIL/DISP 50") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(2);
	td.align = "right"		;
	td.innerHTML = this.menuHienTai  + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp "  ;

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 3;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 50 hiển thị thông báo lỗi của các phân khối chức năng FU (Function Unit) từ 01 đến 06.  <br>"
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "<img border=\"0\" src=\"image/h1.bmp\">";
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "<img border=\"0\" src=\"image/h2.bmp\">";
	}
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "FAIL/DISP 51") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai  + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp " ;

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 3;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 51 hiển thị thông báo lỗi của các phân khối chức năng FU (Function Unit) từ 07 đến 10, 21 và 22."
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "<img border=\"0\" src=\"image/h1.bmp\">";
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "<img border=\"0\" src=\"image/h2.bmp\">";
	}
	
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "FAIL/DISP 52") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai  + "&nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp "  ;

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);	
	
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 3;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 52 hiển thị thông báo lỗi của các phân khối chức năng FU (Function Unit) 24 và 25."
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "<img border=\"0\" src=\"image/h1.bmp\">";
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "<img border=\"0\" src=\"image/h2.bmp\">";
	}
	
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "TEST/PROG 60") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(3);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai  + "&nbsp &nbsp &nbsp &nbsp  ";

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 60 dùng để khởi động việc kiểm tra “off-line” khối TVD 900. Bên trên là màn hiển thị khi không có thao tác kiểm tra nào được thực hiện.<br> Muốn kiểm tra phân khối chức năng (FU) nào, chỉ cần nhập mã số của phân khối đó (XX) từ bàn phím. Để kiểm tra toàn bộ các FU, nhập vào mã “FF” từ bàn phím. Khi kiểm tra đến FU nào, trên màn hình sẽ có thông báo “FU TESTED: XX” với “XX” là mã số của FU được kiểm tra. Để dừng việc kiểm tra đang được tiến hành, nhập vào mã “00”.<br>Khi kết thúc kiểm tra, nếu như không phát hiện lỗi, trên màn hình sẽ xuất hiện thông báo “TEST PROGRAM OVER * NO FAIL”. Nếu như phát hiện lỗi, trên màn hình sẽ xuất hiện thông báo “TEST PROGRAM OVER * SEE FAILS PREVIOUS”. Lúc này chỉ cần nhấn phím “” để truy cập trang thông báo lỗi 50. "

	}
	
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "SIGN/DISP 70") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(3);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 70 dùng để điều khiển việc cấp các tín hiệu nhận được từ các phân khối chức năng khác nhau của TVD 900 tới jack J19 trên tuyến thu (reception bus) để hiển thị.<br>- ZERO PAC MU<br>  MTI PAC MU<br>Hiển thị ngưỡng PAC trung bình của kênh ZERO hay MTI trên J19.<br>- ZERO PAC SD<br>  MTI PAC SD<br>Hiển thị sai số PAC đặc trưng của kênh ZERO hay MTI trên J19.<br>- ZERO PAC THRES<br>  MTI PAC THRES<br>Hiển thị ngưỡng PAC của kênh ZERO hay MTI trên J19.<br>- ZERO FTC THRES<br>  MTI FTC THRES<br>Hiển thị ngưỡng FTC của kênh ZERO hay MTI trên J19.<br>"

	
	}
	
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "SIGN/DISP 71") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(3);
	td.align = "Right"		;
	td.innerHTML =  this.menuHienTai  + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
		
 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 71 dùng để điều khiển việc cấp các tín hiệu nhận được từ các phân khối chức năng khác nhau của TVD 900 tới jack J19 trên tuyến thu (reception bus) để hiển thị.<br>Ý nghĩa của các tham số ở đây tương tự như đã được trình bày ở trang 70, chỉ khác là chúng được sử dụng cho các kênh +FR/4 và –FR/4."

	
	
	}
	
	if (this.soThuocTinh ==1 && this.menuTruoc != "" && this.menuHienTai == "SIGN/DISP 72") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = this.mangThongTinMenu[0];
	td = tr.insertCell(3);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai  + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" ;

	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.innerHTML = "";
	
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 71 dùng để điều khiển việc cấp các tín hiệu nhận được từ các phân khối chức năng khác nhau của TVD 900 tới jack J19 trên tuyến thu (reception bus) để hiển thị.<br>- CFAR ZERO VIDEO <br>- CFAR MTI VIDEO <br>- CFAR +FR/4 VIDEO<br>- CFAR –FR/4 VIDEO<br>Hiển thị tín hiệu CFAR VIDEO (Log Video đã trừ ngưỡng) cuả kênh tương ứng trên J19.<br>- LOAD LIM THRES<br>Hiển thị ngưỡng hạn chế tải trên J19.<br>- LOAD LIM CELL<br>Hiển thị việc phân chia hạn chế tải thành các ô trên J19.<br>"

	
	
	}
	
	
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "MODE/DISP 20") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	
	//td.innerHTML = " ";
	td.align = "Right"	
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML =  this.menuHienTai ;
	
	
		//for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
		for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 17)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--";	
	
	
	

	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = " Trang 20 hiển thị các tham số cấu hình đã được thiết lập nhờ nhánh menu 9 (trang 90 đến 95).<br>- CLUTTER OPTION: YES/NO<br>Tuỳ chọn tách hay không tách nhiễu di động. Nếu trạng thái này là “NO” thì các kênh lọc ± FR/4 sẽ bị cấm.<br>- 15 MHz CLOCK: INT/EXT<br>Tạo tín hiệu đồng hồ 15 MHz từ bên trong (INT) hay bên ngoài (EXT) khối TVD 900.<br>- FTC CELL: 8Q/16Q<br>Kích thước ô (cự ly) để tính ngưỡng FTC. Giá trị trung bình phía trước và phía sau được tính theo 8 hay 16 lượng tử.<br>- PAC CELL (ns): 800/1600/2400/3200<br>Kích thước ô cự ly để tính ngưỡng PAC.<br>- TRACKING UNIT: INT/EXT<br>Sử dụng bộ Xử lý quỹ đạo ở bên trong (INT) hay bên ngoài (EXT) thiết bị. TVD 900 mặc định sử dụng bộ Xư lý quỹ đạo ngoài (EXT).<br> - IEEE ADDRESS: XX DEC<br>Giá trị địa chỉ I3E của thiết bị (mã thập phân).<br>- MASTER TVD: YES/NO<br>Cấu hình Master/Slave của các khối TVD 900. Master TVD được gọi là TVD A, còn Slave TVD được gọi là TVD B.<br>- QUANTUM (ns): 400/800<br>Giá trị lượng tử đã chọn.<br>- DELAY DIV: 8Q/16Q<br>Giá trị giữ chậm trong chế độ đa tần (để đảm bảo đồng bộ chung)."

}
	
	
	
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "MODE/DISP 21") 
	{
		tr = this.myTable.insertRow(-1);
		td = tr.insertCell(0);
		td = tr.insertCell(1);
	
	//td.innerHTML = " ";
		td.align = "Right"	
		td = tr.insertCell(2);
		td.align = "Right"		;
		td.innerHTML = this.menuHienTai ;
		
		for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 21)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
    tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--";	
	
	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 21 hiển thị tham số tự động cấu hình lại hoạt động và trạng thái các tín hiệu GO/NOGO vào và ra của hệ thống.<br>- SYNCHRO GENE: A/B/NO<br>Chỉ thị việc tạo tín hiệu đồng bộ được thực hiện từ TVD A hay TVD B. Khi mạch đồng bộ của khối đang làm việc bị sự cố, hệ thống sẽ tự động chuyển sang đồng bộ từ khối kia. Nếu mạch đồng bộ của cả hai khối cùng hỏng sẽ xuất hiện thông báo “SYNCHRO GENE: NO”.<br>- AUTO DIV MODE: A/B/A+B<br>Chỉ thị chế độ làm việc (đơn tần hay đa tần). Việc cấu hình chế độ làm việc này được thực hiện tự động nhờ TVD 900 theo trạng thái các tín hiệu GO/NOGO đầu vào (GO/NOGO từ máy phát, GO/NOGO từ máy thu, GO/NOGO từ thiết bị đa tần) và trạng thái bên trong của TVD (tín hiệu GO/NOGO nội tại). Tuy nhiên vẫn có thể đặt cưỡng bức TVD hoạt động ở chế độ DIV A, DIV B, DIV A+B hay DIV A.B <br>- MTI CHANNEL    : ON/OFF<br>  ZERO CHANNEL: ON/OFF<br>  +FR/4 CHANNEL: ON/OFF<br>  -FR/4 CHANNEL : ON/OFF<br>Trạng thái các kênh lọc được quản lý tự động nhờ thiết bị kiểm tra nội tại BITE theo các sự cố được phát hiện ở từng kênh. Cũng có thể đặt cưỡng bức các kênh ở ON hay OFF (xem trang 44). Trạng thái này có thể bị xoá khi reset TVD 900<br>- RR STATUS: GO/NOGO/NONE<br>Trạng thái GO/NOGO từ máy thu. Thông tin “NONE” được hiển thị khi bỏ qua trạng thái GO/NOGO của máy thu.<br> ER STATUS: GO/NOGO/NONE<br>Trạng thái GO/NOGO từ máy phát.<br>- 1>2-DIV-STAT: GO/NOGO<br>Trạng thái GO/NOGO được gửi sang kênh 2 (kênh 1 là kênh người sử dụng đang cho hiển thị thông tin).<br>- 2>1-DIV-STAT: GO/NOGO/NONE<br>Trạng thái GO/NOGO nhận từ kênh 2.<br>- OUTPUT STATUS: GO/NOGO<br>Trạng thái GO/NOGO đầu ra (đưa tới mặt trước khối TVD và khối Xử lý quỹ đạo). Thông tin này được tạo ra từ các tín hiệu GO/NOGO đầu vào và các tín hiệu GO/NOGO nội tại của khối TVD.<br>"
	}
	
	
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/DISP 30") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	var td1 = tr.insertCell(1) ;
	
	td1.colSpan = 2;
	td1.align = "Center"		;
	td1.innerHTML =  " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+this.menuHienTai ;
	
	//td.innerHTML = "</pre>";
	
		for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
		    tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[0*2] + this.mangThongTinMenu[0*2+1]  ;
			td = tr.insertCell(1);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[1*2] + this.mangThongTinMenu[1*2+1]  ;
		
			// td = tr.insertCell(2);
			// td.align = "Left";
			// td.innerHTML = this.mangThongTinMenu[1*2] + this.mangThongTinMenu[1*2+1]  ;
			
		 for (i=2;i <= 2 ;i++)
		{
		   tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*2] + this.mangThongTinMenu[i*2+1];
			td = tr.insertCell(1);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*2+2] + this.mangThongTinMenu[i*2+3];
			td = tr.insertCell(2);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*2 + 4] + this.mangThongTinMenu[i*2+5];
			
		}
		 for (i=3;i <= 3 ;i++)
		{
		   tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*3+1] + this.mangThongTinMenu[i*3+2];
			td = tr.insertCell(1);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*3+3] + this.mangThongTinMenu[i*3+4];
			td = tr.insertCell(2);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*3 + 5] + this.mangThongTinMenu[i*3+6];
			
		}
		tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[16] + this.mangThongTinMenu[17];
			
		 for (i=9;i <= 9 ;i++)
		{
		   tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*2] + this.mangThongTinMenu[i*2+1];
			td = tr.insertCell(1);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*2+2] + this.mangThongTinMenu[i*2+3];
			td = tr.insertCell(2);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[i*2 + 4] + this.mangThongTinMenu[i*2+5];
			
		}	
			
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.colSpan = 2;
			td.innerHTML = "SOFTWEAR REVISION NUMBER"
			
			//td.innerHTML = "REVISION NUMBER";
			td = tr.insertCell(1);
			td.align = "Left";
			td.innerHTML = this.mangThongTinMenu[25];
			
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--";	
	

	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Trang 30 hiển thị trạng thái của các tham số đã được thiết lập trong các trang từ 41 đến 43.<br>- LC STC: 1/2/AUTO/NO<br>Chỉ thị dạng luật STC đã chọn cho cánh sóng thấp. “NO” thể hiện STC được đặt cưỡng bức về mức 0 trên toàn dải cự ly.<br>- HC STC: 1/2/AUTO/NO<br>Chỉ thị dạng luật STC đã chọn cho cánh sóng cao. “NO” cũng có ý nghĩa như đối với cánh sóng thấp.<br>- ZERO CHAN: 4P/5P<br>  MTI CHAN    : 4P/5P<br>Kênh Zero và kênh MTI gồm 3 khâu xoá (mắt lọc) hay 4 khâu xoá.<br>- DIV: A/B/A+B/A.B<br>Chỉ thị chức năng đa tần đã được chọn trong trang 42. Nếu người sử dụng không có tác động nào nhằm thay đổi sự lựa chọn, thông tin hiển thị tương tự như đã được trình bày trên trang 21.<br>- LOAD LIM: ON/OFF<br>Ngưỡng hạn chế tải hoạt động (ON) hay không (OFF).<br> COR LAW: 1/2<br>Luật (tiêu chuẩn) tương quan đã chọn để phát hiện tín hiệu mục tiêu (7/13 hoặc 9/13).<br>- STAG: ON/OFF<br>Tần số lặp lại của xung đồng bộ được thay đổi (lắc) hoặc không thay đổi.<br>- EXTR LAW: STD/HARD<br>Luật tách (phát hiện) tín hiệu tiêu chuẩn (STD) hay chặt chẽ (HARD).<br>- WEATH-VID: EDGE/FULL<br>Chỉ thị tín hiệu “video mây” (analog) được hiển thị dưới dạng đường bao hay đầy đủ.<br> CFAR-VIDEO: 1/2<br>Chỉ thị tín hiệu video CFAR (analog) tuân theo luật tích hợp 1 hay 2<br>- J08DISP: FE/PRS<br>Hiển thị đoạn cuối của tín hiệu phản xạ hay tín hiệu phản xạ được kết hợp và tương quan tại lỗ kiểm tra J8.<br>- SOFTWARE REVISION NUMBER: XY_ZT<br>Số phiên bản (version) phần mềm của thiết bị BITE.<br>XY - Số chỉ thị nâng cấp chức năng;<br>Z  - Chữ số chỉ thị nâng cấp không chức năng;<br>T  - Chữ số chỉ thị hiệu chỉnh lỗi.<br> "

	}
	
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/DISP 31") 
	{
	  tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);

	td.align = "Left";
	//td.innerHTML = " ";
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai ;
	
	
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
	
	
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--";	
	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "	Trang 31 hiển thị trạng thái của các tham số đã được thiết lập trong các trang từ 44 đến 46.<br>- ZERO CHAN  : ON/OFF<br>  MTI CHAN      : ON/OFF<br>  +FR/4 CHAN  : ON/OFF<br>  -FR/4 CHAN   : ON/OFF<br>Chỉ thị trạng thái của các kênh lọc. Nếu người sử dụng không có tác động nào nhằm thay đổi sự chọn lựa, thông tin hiển thị tương tự như đã được trình bày trên trang 21.<br>- ALL FTC: ON/OFF<br>Chỉ thị ngưỡng FTC của mỗi kênh lọc hoạt động hay không.<br>- ALL PAC: ON/OFF<br>Chỉ thị ngưỡng PAC của mỗi kênh lọc hoạt động hay không.<br>- SIGN-SYN: $<br>Trị số của tín hiệu đồng bộ được thiết lập trong trang 46. Trị số này được đọc từ E2PROM trên vỉ mạch TTE 152 (BITE) chứ không phải từ phần cứng của vỉ mạch TTE 150 (Sync Generator), nó khác với trị số được cho trong trang 73 (ở đấy là trị số của tín hiệu được tạo ra bằng phần cứng). “$” có nghĩa là trị số của tín hiệu được cho theo mã hexadecimal. <br>Lưu ý: Đây là trị số được sử dụng làm giá trị chuẩn để kiểm tra bộ Tạo tín hiệu đồng bộ.<br>- HANDSHAKE: INT/EXT<br>Chỉ thị các thông báo điểm dấu được xác nhận bên trong khối hay bên ngoài khối (tại TPR 1000).<br>- ROTATION: INT/EXT<br>Chỉ thị vòng quay được tạo giả từ bên trong (mỗi chu kỳ lặp ứng với một gia số phương vị) hoặc từ bên ngoài nhờ khối Mã hoá phương vị CD 840.<br>- MOV-ECHO: 1/16/CONT/OFF<br>Chỉ thị số tín hiệu phản xạ từ nhiễu di động (mây, mưa …) được tạo ra trong một vòng quay anten. “CONT” có nghĩa là liên tục.<br>- FIX-ECHO: ON/OFF<br>Chỉ thị tín hiệu phản xạ từ nhiễu cố định (địa vật) có được tạo ra hay không.<br>- MOV-FIX ATT:<br>Chỉ thị giá trị suy giảm của tín hiệu phản xạ di động so với tín hiệu phản xạ cố định theo mã thập phân (có giá trị nằm trong khoảng 0 đến 63 dB).<br>"


	}
	
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/PROG 40") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	
	//td.innerHTML = "";
	td.align = "Right"	
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai +"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" ;
	
	
		//for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
	for (i=0;i <= 4 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+5)*2 +1 <= 19)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+5)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+5)*2+1];
			 }
		}
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "	Trang này dùng để reset các chức năng khác nhau của TVD 900. Muốn reset chức năng nào chỉ cần nhập mã (code) tương ứng.<br>- RESET TVD 900<br>Thực hiện reset toàn bộ TVD 900 (reset báo lỗi, reset ngưỡng PAC, reset STC tự thích nghi, reset hạn chế tải, cưỡng bức tất cả các kênh lọc hoạt động, cấu hình lại chức năng đa tần theo các tín hiệu GO/NOGO nội bộ, chuyển các tín hiệu GO/NOGO đầu ra và nội tại thành GO).<br>- RESET SYNC<br>Reset bộ tạo tín hiệu đồng bộ. Nếu các khối TVD ở chế độ đa tần, RESET SYNC sẽ đặt lại TVD A là bộ tạo tín hiệu đồng bộ.<br>Với điều kiện ban đầu:<br> TVD A là bộ tạo tín hiệu đồng bộ (thông báo trên trang 21: “SYNCHRO GENE: A”);<br> TVD B nhận tín hiệu đồng bộ từ TVD A (thông báo trên trang 21: “SYNCHRO GENE: A”);<br> Không phát hiện lỗi (sự cố) ở cả hai TVD;<br>có thể xảy ra các tình huống như được trình bày dưới đây.<br>a) Nếu xuất hiện lỗi đồng bộ hay lỗi giám sát ở TVD A ( mã lỗi FU02 2 hay FU02 1), hoặc TVD B phát hiện lỗi của tín hiệu đồng bộ được cấp từ TVD A (lỗi FU02 2 được phát hiện bởi TVD B nhưng là của TVD A), thì việc chuyển đổi bộ tạo tín hiệu đồng bộ sẽ được thực hiện. TVD B trở thành nơi cung cấp tín hiệu đồng bộ (thông báo trên trang 21 của TVD A và TVD B: “SYNCHRO GENE: B”).<br> RESET SYNC một trong hai khối TVD được sử dụng để quay về trạng thái ban đầu (TVD A là bộ tạo tín hiệu đồng bộ). Tất nhiên lúc này cũng phải thực hiện cả RESET FAILURES trên TVD A để xóa các lỗi đã được phát hiện.<br>b) Nếu hệ thống đã tự động chuyển đổi bộ tạo tín hiệu đồng bộ từ TVD A sang TVD B (như tình huống đã nêu ở trên) mà TVD B tiếp tục có sự cố (lỗi đồng bộ hay lỗi giám sát) thì việc tạo tín hiệu đồng bộ của TVD B sẽ bị dừng. Thông báo trên trang 21 của TVD A lúc này vẫn là 'SYNCHRO GENE: B', còn thông báo trên trang 21 của TVD B sẽ là “SYNCHRO GENE: NO”.<br>Để trở lại trạng thái ban đầu cần thực hiện RESET SYNC cho 1 trong 2 khối TVD và RESET FAILURES cho cả 2 khối để xóa các lỗi đã được phát hiện.<br>- RESET ZERO PAC<br>  RESET MTI PAC<br>  RESET +FR/4 PAC<br>  RESET –FR/4 PAC<br>Reset ngưỡng PAC của từng kênh lọc.<br>- RESET ALL PAC<br>Reset tất cả các ngưỡng PAC.<br>- RESET AUTO STC<br>Reset (đặt về mức “0”) thành phần tự thích nghi của tín hiệu điều khiển STC.<br>- RESET LOAD LIM<br>Reset ngưỡng của bộ hạn chế tải.<br>- RESET FAILURES<br>Reset tất cả các lỗi của TVD 900.<br>- FORCED SYNCHRO TVD B ON/OFF<br>Việc điều khiển này chỉ thực hiện được ở TVD A, nó được sử dụng để cưỡng bức lấy tín hiệu đồng bộ từ TVD B. Trong trường hợp này thông báo trên trang 21 của TVD A và TVD B sẽ là “SYNCHRO GENE: B”.<br>"

	
	
	}
	
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/PROG 41") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	
	//td.innerHTML = "";
	td.align = "Right"	
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML =  this.menuHienTai+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" ;
	
	
		//for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
	for (i=0;i <= 4 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+5)*2 +1 <= 19)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+5)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+5)*2+1];
			 }
		}
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	

	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "	Sử dụng trang này để đặt các tham số hoạt động của TVD 900 và ý nghĩa của từng tham số được giải thích dưới đây.<br>- LC STC 1	- HC STC 1<br>  - LC STC 2	- 	HC STC 2<br> - AUTO LC STC	- AUTO HC STC<br>  -NO LC STC	- NO HC STC<br>Đặt tín hiệu điều khiển STC của cánh sóng thấp (LC) và cánh sóng cao (HC) theo luật 1 (min), luật 2 (max), tự thích nghi (kết hợp giữa luật min và max) hoặc cưỡng bức về mức “0” (NO STC).<br>- STAG ON/OFF<br>Kích hoạt hoặc không kích hoạt việc thay đổi tần số lặp (staggering) của radar.<br>"

	
	}
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/PROG 42") 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	
	//td.innerHTML = "";
	td.align = "Right"	
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" ;
	
	
		//for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
	for (i=0;i <= 4 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+5)*2 +1 <= 19)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+5)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+5)*2+1];
			 }
		}
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML =	"Sử dụng trang này để đặt tham số hoạt động của TVD 900. Ý nghĩa của các tham số trong trang này đã được trình bày ở trang 30. Riêng tham số CLUTTER OPT ON/OFF được trình bày ở trang 20."

	
	}
	
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/PROG 43" ) 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	
	//td.innerHTML = "";
	td.align = "Right"	
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML =  this.menuHienTai+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" ;
	
	
		//for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML =	"Sử dụng trang này để đặt tham số hoạt động của TVD 900. Ý nghĩa của các tham số trong trang này đã được trình bày ở trang 30."
	
	}
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/PROG 44" ) 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	
	//td.innerHTML = "";
	td.align = "Right"	
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML =  this.menuHienTai+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" ;
	
	
		//for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML = "Sử dụng trang này để đặt tham số hoạt động của TVD 900. Ý nghĩa của các tham số trong trang này đã được trình bày ở trang 31."

	
	}
	
	if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/PROG 45" ) 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	
	//td.innerHTML = "";
	td.align = "Right"	
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML =  this.menuHienTai+"&nbsp;&nbsp;&nbsp;&nbsp;" ;
	
	
		//for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML ="Sử dụng trang này để đặt tham số hoạt động của TVD 900. Ý nghĩa của các tham số trong trang này đã được trình bày ở trang 31."

	}
	
		if (this.soThuocTinh ==1 && this.menuTruoc != ""  && this.menuHienTai == "PARA/PROG 46" ) 
	{
	
	tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	
	//td.innerHTML = "";
	td.align = "Right"	
	td = tr.insertCell(2);
	td.align = "Right"		;
	td.innerHTML = this.menuHienTai + "";
	
	
		//for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi -2 ;i++)
	for (i=0;i <= 5 ;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*2];
			td = tr.insertCell(1);
			td.align ='left';
			td.innerHTML = this.mangThongTinMenu[i*2+1];
			if ((i+6)*2 +1 <= 23)
			{td = tr.insertCell(2);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2];
			td = tr.insertCell(3);
			td.innerHTML = this.mangThongTinMenu[(i+6)*2+1];
			 }
		}
		
	 tr = this.myTable.insertRow(-1);
	td = tr.insertCell(0);
	td.colSpan = 4;
	td.align = "Left";
	td.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;" +"NEXT : -->" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "PRE: <--" + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "ENTER CODE:"              ;	
	
	tr = this.myTable2.insertRow(-1);
	td = tr.insertCell(0);
	td = tr.insertCell(1);
	td.innerHTML ="Sử dụng trang này để đặt tham của số hoạt động TVD 900. Ý nghĩa của các tham số trong trang này đã được trình bày ở trang 31. Riêng VIDEO ON/OFF được sử dụng để cưỡng bức (hoặc không) từng tín hiệu I hay Q VIDEO ở đầu vào các kênh lọc về mức “0”."

	}
	
	/////////////////////////////////////////////////////////////////////////////
	
	if (this.soThuocTinh==2)
	{
		for (i=this.dongDauDangHienThi;i<this.dongCuoiDangHienThi+1;i++)
		{
			tr = this.myTable.insertRow(-1);
			td = tr.insertCell(0);
			td.innerHTML = this.mangThongTinMenu[i*3];
			td = tr.insertCell(1);
			td.align ='right';
			td.innerHTML = this.mangThongTinMenu[i*3+1];
			td = tr.insertCell(2);
			td.align ='right';
			td.innerHTML = this.mangThongTinMenu[i*3+2];
		}
	}
	// if (this.cachCanLe=="Left" && this.duocCapNhat == "NO" && this.laMenuCuoi =="NO")
	// {
		// for (i =0; i< this.myTable.rows.length;i++)
		// {
			// td = this.myTable.rows[i].insertCell(0);
			// td.width ="10px";
		// }
		// this.myTable.rows[this.dongHienTai-this.dongDauDangHienThi].cells[0].innerHTML ="";
		// neu menu do khong di duoc xuong duoi thi cho no  mau xam
		// for (i=0;i<this.myTable.rows.length;i++)
		// {
			// if (this.mangTrangThaiMenu[this.dongDauDangHienThi+i]=="")
				// for (j=1; j<this.myTable.rows[i].cells.length;j++)
				// {
					// td = this.myTable.rows[i].cells[j];
					// td.innerHTML = "<font color =silver>" + td.innerText + "</font>";					
				// }
		// }
		// if (this.dongCuoiDangHienThi+1<this.soMenu||this.dongDauDangHienThi>0)
		// {
			// for (i =0; i< this.myTable.rows.length;i++)
				// this.myTable.rows[i].insertCell(-1);
			// if (this.dongCuoiDangHienThi+1<this.soMenu)
			// {
				// var dongCuoi =this.myTable.rows[this.myTable.rows.length-1];
				// var soODongCuoi = dongCuoi.cells.length;
				// td = dongCuoi.cells[soODongCuoi-1];
				// td.align ='right';
				// td.innerHTML = "<img border=\"0\" width = \"9\" height = \"12\" src=\"images/mui_ten_xuong.bmp\">";
			// }
			// if (this.dongDauDangHienThi>0)
			// {
				// var dongDau =this.myTable.rows[0];
				// var soODongDau = dongDau.cells.length;
				// td = dongDau.cells[soODongDau-1];
				// td.align ='right';
				// td.innerHTML = "<img border=\"0\" width = \"9\" height = \"12\" src=\"images/mui_ten_len.bmp\">";
			// }			
		// }
	// }
	// if (this.duocCapNhat == "YES")
	// {
		// this.myTable.rows[0].cells[0].innerText =this.myTable.rows[0].cells[0].innerText +"<UPD>";
		// this.viTriCapNhat = 0;
		// var x = this;
		// this.timeID = setInterval(function(){x.wink();},200);
	// }	
}
function wink()
{
	//nhap nhay vung dang chon
	//tim ra dong va cot dang chon
	var dong, cot;
	if (this.viTriCapNhat==this.soPhanTuCapNhat)
	{
		dong = 0;
		cot = 0;
	}
	else
	{
		dong = parseInt(this.mangViTriCapNhat[this.viTriCapNhat])/3;
		cot = parseInt(this.mangViTriCapNhat[this.viTriCapNhat])%3;
	}
	for (var i=0;i<this.myTable.rows.length;i++)
		for (var j=0;j<3;j++)
			if (i!=dong && j!=cot)
				if (i ==0 && j==0)
				{
					var t = this.myTable.rows[i].cells[j].innerText;
					t = t.substring(0,2);
					this.myTable.rows[i].cells[j].innerHTML = t + "<font color = #000099>" +"<" + "</font>" + "UPD" + "<font color = #000099>" +">" + "</font>";  	
				}
				else
					this.myTable.rows[i].cells[j].innerHTML = this.myTable.rows[i].cells[j].innerText;
	var text = this.myTable.rows[dong].cells[cot].innerText;
	//alert("thanh cong");
	if (this.state==0)
	{
		this.state =1;
		if (dong==0 && cot ==0)
		{
			var sPhanDau = text.substring(0,2);
			this.myTable.rows[0].cells[0].innerHTML = sPhanDau + "<font color = yellow>" +"<" + "</font>" + "UPD" + "<font color = yellow>" +">" + "</font>";  	
		}
		else
			this.myTable.rows[dong].cells[cot].innerHTML = "<font color = yellow>" + text +"</font>";  	
	}
	else
	{
		this.state = 0;
		if (dong ==0 && cot ==0)
		{
			var sPhanDau = text.substring(0,2);
			this.myTable.rows[0].cells[0].innerHTML = sPhanDau + "<font color = cadetblue>" +"<" + "</font>" + "UPD" + "<font color = cadetblue>" +">" + "</font>";  	
		}
		else
			this.myTable.rows[dong].cells[cot].innerHTML = "<font color = cadetblue>" + text + "</font>";  	
	}
}
//================================================xu ly su kien================================================
//xu ly su kien trong form

function xuLyENTER()
{
	if (this.dangMenu ==1)//binh thuong
	{
		//den menu con cua no
		
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	}
	if (this.dangMenu ==2)
	{
		// dang menu cho cap nhat tham so
		//kiem tra dang o dong nao, neu o vi tri cap nhat thi tien hanh cap  nhat gia tri
		if (this.viTriCapNhat == this.soPhanTuCapNhat)
		{
			//tien hanh cap nhat 
			//bat dau tu vi tri dong cap nhat la cap nhat vao gai tri
			var oNodeList;
			oNodeList = xmlDoc.getElementsByTagName('Menu');
			//tim trong file XML co menu nao co ten nhu tren hay khong
			var node;
			var i,j;
			for (i=0;i<oNodeList.length;i++)
			{	
				node = oNodeList.item(i);
				if (node.attributes.getNamedItem('ten').nodeValue == this.menuHienTai)
					break;
			}
			j=0;
			for (i=0;i<node.childNodes.length;i++)
				if (node.childNodes(i).attributes.getNamedItem('IsAllowUpdate').nodeValue =="YES")
				{
					node.childNodes(i).childNodes(0).attributes.getNamedItem('value').nodeValue = this.mangGiaTriCanCapNhat[j];
					j+=1;
					node.childNodes(i).childNodes(1).attributes.getNamedItem('value').nodeValue = this.mangGiaTriCanCapNhat[j];
					j+=1;
				}
			clearInterval(this.timeID);
			this.timeID ="";
			var text = this.myTable.rows[0].cells[0].innerText;
			var sPhanDau = text.substring(0,2);
			this.myTable.rows[0].cells[0].innerHTML = sPhanDau + "<font color = yellow>" +"<" + "</font>" + "UPD" + "<font color = yellow>" +">" + "</font>";  				
		}
	}
} 


function xulyNut0()
{
	if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","LC STC 1 ","LC STC 1 ",": 0*");
		UpdatelaiData("PARA/PROG 41","LC STC 2 ","LC STC 2 ",": 1");
		UpdatelaiData("PARA/PROG 41","AUTO LC STC","AUTO LC STC",": 2");
		UpdatelaiData("PARA/PROG 41","NO LC STC","NO LC STC",": 3");
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		
		UpdatelaiData("PARA/DISP 30","LC STC    ","LC STC    ",": 1");
		
	}
	
	if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","4P ZERO-CHAN","4P ZERO-CHAN",": 0*");
		UpdatelaiData("PARA/PROG 42","5P ZERO-CHAN","5P ZERO-CHAN",": 1");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","ZERO CHAN ","ZERO CHAN ",": 4P");
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","J08 DISP FE","J08 DISP FE",": 0*");
		UpdatelaiData("PARA/PROG 43","J08 DISP PRS","J08 DISP PRS",": 1");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","J08DISP","J08DISP",": FE");
	}
	
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","ZERO CHAN ON","ZERO CHAN ON",": 0*");
		UpdatelaiData("PARA/PROG 44","ZERO CHAN OFF","ZERO CHAN OFF",": 1");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","ZERO CHAN ","ZERO CHAN ",": ON");
	}
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","ROTATION EXT","ROTATION EXT",": 0*");
		UpdatelaiData("PARA/PROG 45","ROTATION INT","ROTATION INT",": 1");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","ROTATION ","ROTATION ",": EXT");
	}

}
function xulyNutF()
{
	
	sl = parseInt(solan);
	sl++;
	solan++;
	if ((sl == 2) && (this.menuHienTai == "TEST/PROG 60" ))
	{
	sl = 0;
	solan = 0;
	UpdatelaiData("TEST/PROG 60","FU TESTED","FU TESTED",": FF");
	this.DocThongTinMenu("TEST/PROG 60");
	this.HienThiThongTin();
	
	UpdatelaiData("TEST/PROG 60","TEST PROGRAM OPERATING *","TEST PROGRAM OVER *","");
	UpdatelaiData("TEST/PROG 60","FU TESTED","NO FAIL","");
	this.DocThongTinMenu("TEST/PROG 60");
	var x = this;
	setTimeout(function(){x.HienThiThongTin();},4000);
		
	UpdatelaiData("TEST/PROG 60","TEST PROGRAM OVER *","TEST PROGRAM OPERATING *","");
	UpdatelaiData("TEST/PROG 60","NO FAIL","FU TESTED",": NO");	
	
	}
	
	
}

function xulyNut1()
{
	
	
	if (this.menuHienTai == "MODE/PROG 10")
	{
		
		SetLOCOPER();
		var oNodeList;
		var i,j;
		oNodeList = xmlDoc.getElementsByTagName('Menu');
		//tim trong file XML co menu nao co ten nhu tren hay khong
		
		var node;
		for (i=0;i<oNodeList.length;i++)
		{	
			node = oNodeList.item(i);
			if (node.attributes.getNamedItem('ten').nodeValue == "LOC/MAIN")
				break;
		}
		node.attributes.getNamedItem('tenht').nodeValue = "LOC/OPER";
		this.DocThongTinMenu("LOC/MAIN");
		//this.tenhienthi = "LOC/OPER";
		
		//var x = this;
		//setTimeout(function(){x.HienThiThongTin();},1000);
		this.HienThiThongTin();
		//setTimeout(function(){x.HienThiThongTin();},2000);
		
		UpdatelaiData("MODE/PROG 10","LOC/OPER","LOC/OPER",": 1*");
		UpdatelaiData("MODE/PROG 10","LOC/MAINT","LOC/MAINT",": 2");
		UpdatelaiData("MODE/PROG 10","REMOTE","REMOTE",": 3");
		}
	
	else
	{		
	
	if ((this.dangMenu ==1) && (this.menuHienTai!= "MODE/PROG 10"))   //binh thuong
	{
		//den menu con cua no
		this.dongHienTai = 0;
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	
	
	}	
	
	if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","LC STC 1 ","LC STC 1 ",": 0");
		UpdatelaiData("PARA/PROG 41","LC STC 2 ","LC STC 2 ",": 1*");
		UpdatelaiData("PARA/PROG 41","AUTO LC STC","AUTO LC STC",": 2");
		UpdatelaiData("PARA/PROG 41","NO LC STC","NO LC STC",": 3");
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		
		UpdatelaiData("PARA/DISP 30","LC STC    ","LC STC    ",": 2");
		
	}
	
		if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","4P ZERO-CHAN","4P ZERO-CHAN",": 0");
		UpdatelaiData("PARA/PROG 42","5P ZERO-CHAN","5P ZERO-CHAN",": 1*");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","ZERO CHAN ","ZERO CHAN ",": 5P");
		
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","J08 DISP FE","J08 DISP FE",": 0");
		UpdatelaiData("PARA/PROG 43","J08 DISP PRS","J08 DISP PRS",": 1*");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","J08DISP","J08DISP",": PRS");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","ZERO CHAN ON","ZERO CHAN ON",": 0");
		UpdatelaiData("PARA/PROG 44","ZERO CHAN OFF","ZERO CHAN OFF",": 1*");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","ZERO CHAN ","ZERO CHAN ",": OFF");
	}

	
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","ROTATION EXT","ROTATION EXT",": 0");
		UpdatelaiData("PARA/PROG 45","ROTATION INT","ROTATION INT",": 1*");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","ROTATION ","ROTATION ",": INT");
	}
		if (this.menuHienTai == "PARA/PROG 46" )
	{
		UpdatelaiData("PARA/PROG 46","IF STC ON","IF STC ON",": 1*");
		UpdatelaiData("PARA/PROG 46","IF STC OFF","IF STC OFF",": 2");
		this.DocThongTinMenu("PARA/PROG 46");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","HANDSHAKE","HANDSHAKE",": EXT");
	}

	}
	if (this.dangMenu ==2)
	{
		// dang menu cho cap nhat tham so
		//kiem tra dang o dong nao, neu o vi tri cap nhat thi tien hanh cap  nhat gia tri
		if (this.viTriCapNhat == this.soPhanTuCapNhat)
		{
			//tien hanh cap nhat 
			//bat dau tu vi tri dong cap nhat la cap nhat vao gai tri
			var oNodeList;
			oNodeList = xmlDoc.getElementsByTagName('Menu');
			//tim trong file XML co menu nao co ten nhu tren hay khong
			var node;
			var i,j;
			for (i=0;i<oNodeList.length;i++)
			{	
				node = oNodeList.item(i);
				if (node.attributes.getNamedItem('ten').nodeValue == this.menuHienTai)
					break;
			}
			j=0;
			for (i=0;i<node.childNodes.length;i++)
				if (node.childNodes(i).attributes.getNamedItem('IsAllowUpdate').nodeValue =="YES")
				{
					node.childNodes(i).childNodes(0).attributes.getNamedItem('value').nodeValue = this.mangGiaTriCanCapNhat[j];
					j+=1;
					node.childNodes(i).childNodes(1).attributes.getNamedItem('value').nodeValue = this.mangGiaTriCanCapNhat[j];
					j+=1;
				}
			clearInterval(this.timeID);
			this.timeID ="";
			var text = this.myTable.rows[0].cells[0].innerText;
			var sPhanDau = text.substring(0,2);
			this.myTable.rows[0].cells[0].innerHTML = sPhanDau + "<font color = yellow>" +"<" + "</font>" + "UPD" + "<font color = yellow>" +">" + "</font>";  				
		}
	}
} 

function xulyNut2()
{

	if (this.menuHienTai == "MODE/PROG 10" )
	
	
		{
		SetLOCMAIN ();
		var oNodeList;
		var i,j;
		oNodeList = xmlDoc.getElementsByTagName('Menu');
		//tim trong file XML co menu nao co ten nhu tren hay khong
		
		var node;
		for (i=0;i<oNodeList.length;i++)
		{	
			node = oNodeList.item(i);
			if (node.attributes.getNamedItem('ten').nodeValue == "LOC/MAIN")
				break;
		}
		node.attributes.getNamedItem('tenht').nodeValue = "LOC/MAIN";
		this.DocThongTinMenu("LOC/MAIN");
		this.HienThiThongTin();
			UpdatelaiData("MODE/PROG 10","LOC/OPER","LOC/OPER",": 1");
		UpdatelaiData("MODE/PROG 10","LOC/MAINT","LOC/MAINT",": 2*");
		UpdatelaiData("MODE/PROG 10","REMOTE","REMOTE",": 3");
		}
	
	else

  {

	if (this.dangMenu ==1)//binh thuong
	{
		//den menu con cua no
		this.dongHienTai = 1;
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	}
  }
  
  
  if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","LC STC 1 ","LC STC 1 ",": 0");
		UpdatelaiData("PARA/PROG 41","LC STC 2 ","LC STC 2 ",": 1");
		UpdatelaiData("PARA/PROG 41","AUTO LC STC","AUTO LC STC",": 2*");
		UpdatelaiData("PARA/PROG 41","NO LC STC","NO LC STC",": 3");
		
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","LC STC    ","LC STC    ",": AUTO");
		
	}
	if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","4P MTI-CHAN","4P MTI-CHAN",": 2*");
		UpdatelaiData("PARA/PROG 42","5P MTI-CHAN","5P MTI-CHAN",": 3");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","MTI CHAN    ","MTI CHAN    ",": 4P");
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","WEATH-VID EDGE","WEATH-VID EDGE",": 2*");
		UpdatelaiData("PARA/PROG 43","WEATH-VID FULL","WEATH-VID FULL",": 3");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","WEATH-VID ","WEATH-VID ",": EDGE");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","MTI CHAN ON","MTI CHAN ON",": 2*");
		UpdatelaiData("PARA/PROG 44","MTI CHAN OFF","MTI CHAN OFF",": 3");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","MTI CHAN   ","MTI CHAN   ",": ON");
	}
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","MOV-ECH 1","MOV-ECH 1",": 2*");
		UpdatelaiData("PARA/PROG 45","MOV-ECH 16","MOV-ECH 16",": 3");
		UpdatelaiData("PARA/PROG 45","MOV-ECH CONT","MOV-ECH CONT",": 4");
		UpdatelaiData("PARA/PROG 45","MOV-ECH OFF","MOV-ECH OFF",": 5");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","MOV-ECHO","MOV-ECHO",": 1");
	}
		if (this.menuHienTai == "PARA/PROG 46" )
	{
		UpdatelaiData("PARA/PROG 46","IF STC ON","IF STC ON",": 1");
		UpdatelaiData("PARA/PROG 46","IF STC OFF","IF STC OFF",": 2*");
		this.DocThongTinMenu("PARA/PROG 46");
		this.HienThiThongTin();
		
	}
	
} 

function xulyNut3()
{

	if (this.menuHienTai == "MODE/PROG 10") 
	{
		SetREMMAINTREMOPER(); 
		var oNodeList;
		var i,j;
		oNodeList = xmlDoc.getElementsByTagName('Menu');
		//tim trong file XML co menu nao co ten nhu tren hay khong
		
		var node;
		for (i=0;i<oNodeList.length;i++)
		{	
			node = oNodeList.item(i);
			if (node.attributes.getNamedItem('ten').nodeValue == "LOC/MAIN")
				break;
		}
		node.attributes.getNamedItem('tenht').nodeValue = "REM/MAIN";
		this.DocThongTinMenu("LOC/MAIN");
		//this.tenhienthi = "LOC/OPER";
		
		//var x = this;
		//setTimeout(function(){x.HienThiThongTin();},1000);
		this.HienThiThongTin();
		//setTimeout(function(){x.HienThiThongTin();},2000);
		UpdatelaiData("MODE/PROG 10","LOC/OPER","LOC/OPER",": 1");
		UpdatelaiData("MODE/PROG 10","LOC/MAINT","LOC/MAINT",": 2");
		UpdatelaiData("MODE/PROG 10","REMOTE","REMOTE",": 3*");
	}
	else
	{
	if (this.dangMenu ==1)//binh thuong
	{
		//den menu con cua no
		this.dongHienTai = 2;
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	}
	}
	if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","LC STC 1 ","LC STC 1 ",": 0");
		UpdatelaiData("PARA/PROG 41","LC STC 2 ","LC STC 2 ",": 1");
		UpdatelaiData("PARA/PROG 41","AUTO LC STC","AUTO LC STC",": 2");
		UpdatelaiData("PARA/PROG 41","NO LC STC","NO LC STC",": 3*");
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		
		UpdatelaiData("PARA/DISP 30","LC STC    ","LC STC    ",": NO");
	}
	if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","4P MTI-CHAN","4P MTI-CHAN",": 2");
		UpdatelaiData("PARA/PROG 42","5P MTI-CHAN","5P MTI-CHAN",": 3*");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","MTI CHAN    ","MTI CHAN    ",": 5P");
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","WEATH-VID EDGE","WEATH-VID EDGE",": 2");
		UpdatelaiData("PARA/PROG 43","WEATH-VID FULL","WEATH-VID FULL",": 3*");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","WEATH-VID ","WEATH-VID ",": FULL");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","MTI CHAN ON","MTI CHAN ON",": 2");
		UpdatelaiData("PARA/PROG 44","MTI CHAN OFF","MTI CHAN OFF",": 3*");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","MTI CHAN   ","MTI CHAN   ",": OFF");
	}
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","MOV-ECH 1","MOV-ECH 1",": 2");
		UpdatelaiData("PARA/PROG 45","MOV-ECH 16","MOV-ECH 16",": 3*");
		UpdatelaiData("PARA/PROG 45","MOV-ECH CONT","MOV-ECH CONT",": 4");
		UpdatelaiData("PARA/PROG 45","MOV-ECH OFF","MOV-ECH OFF",": 5");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","MOV-ECHO","MOV-ECHO",": 16");
	}
		if (this.menuHienTai == "PARA/PROG 46" )
	{
		UpdatelaiData("PARA/PROG 46","I VIDEO ON","I VIDEO ON",": 3*");
		UpdatelaiData("PARA/PROG 46","I VIDEO OFF","I VIDEO OFF",": 4");
		this.DocThongTinMenu("PARA/PROG 46");
		this.HienThiThongTin();
		
	}
} 

function xulyNut4()
{
	if (this.dangMenu ==1)//binh thuong
	{
		//den menu con cua no
		this.dongHienTai = 3;
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	}
		if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","HC STC 1","HC STC 1",": 4*");
		UpdatelaiData("PARA/PROG 41","HC STC 2","HC STC 2",": 5");
		UpdatelaiData("PARA/PROG 41","AUTO HC STC","AUTO HC STC",": 6");
		UpdatelaiData("PARA/PROG 41","NO HC STC","NO HC STC",": 7");
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		
		UpdatelaiData("PARA/DISP 30","HC STC    ","HC STC    ",": 1");
	}
	if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","CLUTTER OPT ON","CLUTTER OPT ON",": 4*");
		UpdatelaiData("PARA/PROG 42","CLUTTER OPT OFF","CLUTTER OPT OFF",": 5");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		UpdatelaiData("MODE/DISP 20","CLUTTER OPTION","CLUTTER OPTION",": YES");
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","COR LAW 1","COR LAW 1",": 4*");
		UpdatelaiData("PARA/PROG 43","COR LAW 2","COR LAW 2",": 5");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","COR LAW    ","COR LAW    ",": 1");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","+FR/4 CHAN ON","+FR/4 CHAN ON",": 4*");
		UpdatelaiData("PARA/PROG 44","+FR/4 CHAN OFF","+FR/4 CHAN OFF",": 5");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","+FR/4 CHAN   ","+FR/4 CHAN   ",": ON");
	}
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","MOV-ECH 1","MOV-ECH 1",": 2");
		UpdatelaiData("PARA/PROG 45","MOV-ECH 16","MOV-ECH 16",": 3");
		UpdatelaiData("PARA/PROG 45","MOV-ECH CONT","MOV-ECH CONT",": 4*");
		UpdatelaiData("PARA/PROG 45","MOV-ECH OFF","MOV-ECH OFF",": 5");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","MOV-ECHO","MOV-ECHO",": CONST");
	}
		if (this.menuHienTai == "PARA/PROG 46" )
	{
		UpdatelaiData("PARA/PROG 46","I VIDEO ON","I VIDEO ON",": 3");
		UpdatelaiData("PARA/PROG 46","I VIDEO OFF","I VIDEO OFF",": 4*");
		this.DocThongTinMenu("PARA/PROG 46");
		this.HienThiThongTin();
		
	}
	
} 

function xulyNut5()
{
	if (this.dangMenu ==1)//binh thuong
	{
		//den menu con cua no
		this.dongHienTai = 4;
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	}
		if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","HC STC 1","HC STC 1",": 4");
		UpdatelaiData("PARA/PROG 41","HC STC 2","HC STC 2",": 5*");
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		
		UpdatelaiData("PARA/DISP 30","HC STC    ","HC STC    ",": 2");
	}
		if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","CLUTTER OPT ON","CLUTTER OPT ON",": 4");
		UpdatelaiData("PARA/PROG 42","CLUTTER OPT OFF","CLUTTER OPT OFF",": 5*");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		UpdatelaiData("MODE/DISP 20","CLUTTER OPTION","CLUTTER OPTION",": NO");
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","COR LAW 1","COR LAW 1",": 4");
		UpdatelaiData("PARA/PROG 43","COR LAW 2","COR LAW 2",": 5*");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","COR LAW    ","COR LAW    ",": 2");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 45","MOV-ECH 1","MOV-ECH 1",": 2");
		UpdatelaiData("PARA/PROG 45","MOV-ECH 16","MOV-ECH 16",": 3");
		UpdatelaiData("PARA/PROG 45","MOV-ECH CONT","MOV-ECH CONT",": 4");
		UpdatelaiData("PARA/PROG 45","MOV-ECH OFF","MOV-ECH OFF",": 5*");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","+FR/4 CHAN   ","+FR/4 CHAN   ",": OFF");
	}
	
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","MOV-ECH CONT","MOV-ECH CONT",": 4");
		UpdatelaiData("PARA/PROG 45","MOV-ECH OFF","MOV-ECH OFF",": 5*");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","MOV-ECHO","MOV-ECHO",": OFF");
	}
		if (this.menuHienTai == "PARA/PROG 46" )
	{
		UpdatelaiData("PARA/PROG 46","Q VIDEO ON","Q VIDEO ON",": 5*");
		UpdatelaiData("PARA/PROG 46","Q VIDEO OFF","Q VIDEO OFF",": 6");
		this.DocThongTinMenu("PARA/PROG 46");
		this.HienThiThongTin();
		
	}
	
} 

function xulyNutA()
{
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","LOAD LIM ON","LOAD LIM ON",": A*");
		UpdatelaiData("PARA/PROG 43","LOAD LIM OFF","LOAD LIM OFF",": B");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","LOAD LIM  ","LOAD LIM  ",": ON");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","ALL PAC ON","ALL PAC ON",": A*");
		UpdatelaiData("PARA/PROG 44","ALL PAC OFF","ALL PAC OFF",": B");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","ALL PAC  ","ALL PAC  ",": ON");
	}

}
function xulyNutB()
{
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","LOAD LIM ON","LOAD LIM ON",": A");
		UpdatelaiData("PARA/PROG 43","LOAD LIM OFF","LOAD LIM OFF",": B*");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","LOAD LIM  ","LOAD LIM  ",": OFF");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","ALL PAC ON","ALL PAC ON",": A");
		UpdatelaiData("PARA/PROG 44","ALL PAC OFF","ALL PAC OFF",": B*");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","ALL PAC  ","ALL PAC  ",": OFF");
	}

}


function xulyNut9()
{
		if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","STAG ON","STAG ON",": 8");
		UpdatelaiData("PARA/PROG 41","STAG OFF","STAG OFF",": 9*");
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		
	}
	
		if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","DIVERSITY A","DIVERSITY A",": 6");
		UpdatelaiData("PARA/PROG 42","DIVERSITY B","DIVERSITY B",": 7");
		UpdatelaiData("PARA/PROG 42","DIVERSITY A+B","DIVERSITY A+B",": 8");
		UpdatelaiData("PARA/PROG 42","DIVERSITY A.B","DIVERSITY A.B",": 9*");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","CFAR VIDEO 1","CFAR VIDEO 1",": 8");
		UpdatelaiData("PARA/PROG 43","CFAR VIDEO 2","CFAR VIDEO 2",": 9*");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","CFAR-VIDEO ","CFAR-VIDEO ",": 2");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","ALL FTC ON","ALL FTC ON",": 8");
		UpdatelaiData("PARA/PROG 44","ALL FTC OFF","ALL FTC OFF",": 9*");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","ALL FTC  ","ALL FTC  ",": OFF");
	}
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","HANDSHAKE EXT","HANDSHAKE EXT",": 8");
		UpdatelaiData("PARA/PROG 45","HANDSHAKE INT","HANDSHAKE INT",": 9*");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","HANDSHAKE","HANDSHAKE",": INT");
	}
}
function xulyNut8()
{
	if ((this.dangMenu ==1) && (this.tenhienthi == "LOC/MAIN"))
	{
		//den menu con cua no
		this.dongHienTai = 7;
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	}
		if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","STAG ON","STAG ON",": 8*");
		UpdatelaiData("PARA/PROG 41","STAG OFF","STAG OFF",": 9");
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
	
	}
	
	if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","DIVERSITY A","DIVERSITY A",": 6");
		UpdatelaiData("PARA/PROG 42","DIVERSITY B","DIVERSITY B",": 7");
		UpdatelaiData("PARA/PROG 42","DIVERSITY A+B","DIVERSITY A+B",": 8*");
		UpdatelaiData("PARA/PROG 42","DIVERSITY A.B","DIVERSITY A.B",": 9");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","CFAR VIDEO 1","CFAR VIDEO 1",": 8*");
		UpdatelaiData("PARA/PROG 43","CFAR VIDEO 2","CFAR VIDEO 2",": 9");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","CFAR-VIDEO ","CFAR-VIDEO ",": 1");
	}
	if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","ALL FTC ON","ALL FTC ON",": 8*");
		UpdatelaiData("PARA/PROG 44","ALL FTC OFF","ALL FTC OFF",": 9");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","ALL FTC  ","ALL FTC  ",": ON");
	}
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","HANDSHAKE EXT","HANDSHAKE EXT",": 8*");
		UpdatelaiData("PARA/PROG 45","HANDSHAKE INT","HANDSHAKE INT",": 9");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","HANDSHAKE","HANDSHAKE",": EXT");
	}
} 


function xulyNut7()
{
	if ((this.dangMenu ==1) && (this.tenhienthi == "LOC/MAIN")) //binh thuong
	{
		//den menu con cua no
		this.dongHienTai = 6;
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	}
		if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","HC STC 1","HC STC 1",": 4");
		UpdatelaiData("PARA/PROG 41","HC STC 2","HC STC 2",": 5");
		UpdatelaiData("PARA/PROG 41","AUTO HC STC","AUTO HC STC",": 6");
		UpdatelaiData("PARA/PROG 41","NO HC STC","NO HC STC",": 7*");
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","HC STC    ","HC STC    ",": NO");
		
	}
	
	if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","DIVERSITY A","DIVERSITY A",": 6");
		UpdatelaiData("PARA/PROG 42","DIVERSITY B","DIVERSITY B",": 7*");
		UpdatelaiData("PARA/PROG 42","DIVERSITY A+B","DIVERSITY A+B",": 8");
		UpdatelaiData("PARA/PROG 42","DIVERSITY A.B","DIVERSITY A.B",": 9");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","DIV  ","DIV  ",": B");
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","STD EXTRAC LAW","STD EXTRAC LAW",": 6");
		UpdatelaiData("PARA/PROG 43","HARD EXTRAC LAW","HARD EXTRAC LAW",": 7*");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","EXTR LAW ","EXTR LAW ",": HARD");
	}
	if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","-FR/4 CHAN ON","-FR/4 CHAN ON",": 6");
		UpdatelaiData("PARA/PROG 44","-FR/4 CHAN OFF","-FR/4 CHAN OFF",": 7*");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","-FR/4 CHAN ","-FR/4 CHAN ",": OFF");
	}
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","FIX-ECH ON","FIX-ECH ON",": 6");
		UpdatelaiData("PARA/PROG 45","FIX-ECH OFF","FIX-ECH OFF",": 7*");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		
	}
	
} 

function xulyNut6()
{
	
	if ((this.dangMenu ==1)&& (this.tenhienthi == "LOC/MAIN"))   //binh thuong
	{
		//den menu con cua no
		this.dongHienTai = 5;
		var tenMenuTiepTheo = LayTenCuaMenuTiepTheo(this.dongHienTai, this.menuHienTai);
		if (tenMenuTiepTheo!='')
		{
			this.DocThongTinMenu(tenMenuTiepTheo);
			if (this.soMenu > 0)
			{
				this.dongHienTai =0;
				this.HienThiThongTin();
			}
		}	
	}
		if (this.menuHienTai == "PARA/PROG 41" )
	{
		UpdatelaiData("PARA/PROG 41","HC STC 1","HC STC 1",": 4");
		UpdatelaiData("PARA/PROG 41","HC STC 2","HC STC 2",": 5");
		UpdatelaiData("PARA/PROG 41","AUTO HC STC","AUTO HC STC",": 6*");
		UpdatelaiData("PARA/PROG 41","NO HC STC","NO HC STC",": 7");
		
		this.DocThongTinMenu("PARA/PROG 41");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","HC STC    ","HC STC    ",": AUTO");
		
	}
	if (this.menuHienTai == "PARA/PROG 42" )
	{
		UpdatelaiData("PARA/PROG 42","DIVERSITY A","DIVERSITY A",": 6*");
		UpdatelaiData("PARA/PROG 42","DIVERSITY B","DIVERSITY B",": 7");
		UpdatelaiData("PARA/PROG 42","DIVERSITY A+B","DIVERSITY A+B",": 8");
		UpdatelaiData("PARA/PROG 42","DIVERSITY A.B","DIVERSITY A.B",": 9");
		this.DocThongTinMenu("PARA/PROG 42");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","DIV  ","DIV  ",": A");
		
	}
		if (this.menuHienTai == "PARA/PROG 43" )
	{
		UpdatelaiData("PARA/PROG 43","STD EXTRAC LAW","STD EXTRAC LAW",": 6*");
		UpdatelaiData("PARA/PROG 43","HARD EXTRAC LAW","HARD EXTRAC LAW",": 7");
		this.DocThongTinMenu("PARA/PROG 43");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 30","EXTR LAW ","EXTR LAW ",": STD");
	}
		if (this.menuHienTai == "PARA/PROG 44" )
	{
		UpdatelaiData("PARA/PROG 44","-FR/4 CHAN ON","-FR/4 CHAN ON",": 6*");
		UpdatelaiData("PARA/PROG 44","-FR/4 CHAN OFF","-FR/4 CHAN OFF",": 7");
		this.DocThongTinMenu("PARA/PROG 44");
		this.HienThiThongTin();
		UpdatelaiData("PARA/DISP 31","-FR/4 CHAN ","-FR/4 CHAN ",": ON");
	}
		if (this.menuHienTai == "PARA/PROG 45" )
	{
		UpdatelaiData("PARA/PROG 45","FIX-ECH ON","FIX-ECH ON",": 6*");
		UpdatelaiData("PARA/PROG 45","FIX-ECH OFF","FIX-ECH OFF",": 7");
		this.DocThongTinMenu("PARA/PROG 45");
		this.HienThiThongTin();
		
	}
		if (this.menuHienTai == "PARA/PROG 46" )
	{
		UpdatelaiData("PARA/PROG 46","Q VIDEO ON","Q VIDEO ON",": 5");
		UpdatelaiData("PARA/PROG 46","Q VIDEO OFF","Q VIDEO OFF",": 6*");
		this.DocThongTinMenu("PARA/PROG 46");
		this.HienThiThongTin();
		
	}
} 


function xulyPREV()
{
	//neu da dang nhap tu System menu thi coi nhu khi quay ve la quay ve tu Password menu
	//if((this.menuTruoc =="Main Menu" ) && (this.mucDangNhap =="ting") && (this.menuHienTai!="Password Menu"))
		//this.menuTruoc="Password Menu";
	//if((this.menuTruoc =="Main Menu" ) && (this.mucDangNhap =="Setting") && (this.menuHienTai!="Password Menu"))
		//this.menuTruoc="Password Menu";
	
	if  ((this.menuTruoc!='') && (this.menuHienTai != "PARA/PROG 41") && (this.menuHienTai != "PARA/PROG 42") && (this.menuHienTai != "PARA/PROG 43")&& (this.menuHienTai != "PARA/PROG 44")&& (this.menuHienTai != "PARA/PROG 45")&& (this.menuHienTai != "PARA/PROG 46") && (this.menuHienTai != "FAIL/DISP 51") && (this.menuHienTai != "FAIL/DISP 52")  )
	{	
		this.DocThongTinMenuTruoc(this.menuTruoc);
		if (this.soMenu > 0)
		{
			this.dongHienTai = this.dongHienTaiCuaMenuTruoc;
			this.HienThiThongTin();
		}
	}
	
	if (this.menuHienTai == "PARA/PROG 41") 
	{
	this.DocThongTinMenu("PARA/PROG 40");
	this.HienThiThongTin();
	}
	
	if (this.menuHienTai == "PARA/PROG 42") 
	{
	this.DocThongTinMenu("PARA/PROG 41");
	this.HienThiThongTin();
	}
	if (this.menuHienTai == "PARA/PROG 43") 
	{
	this.DocThongTinMenu("PARA/PROG 42");
	this.HienThiThongTin();
	}
	if (this.menuHienTai == "PARA/PROG 44") 
	{
	this.DocThongTinMenu("PARA/PROG 43");
	this.HienThiThongTin();
	}
		if (this.menuHienTai == "PARA/PROG 45") 
	{
	this.DocThongTinMenu("PARA/PROG 44");
	this.HienThiThongTin();
	}
		if (this.menuHienTai == "PARA/PROG 46") 
	{
	this.DocThongTinMenu("PARA/PROG 45");
	this.HienThiThongTin();
	}
	
	
	
		if (this.menuHienTai == "FAIL/DISP 51")
	{
	this.DocThongTinMenu("FAIL/DISP 50");
	this.HienThiThongTin();
	}
	
	if (this.menuHienTai == "FAIL/DISP 52")
	{
	this.DocThongTinMenu("FAIL/DISP 51");
	this.HienThiThongTin();
	}
	

}
function xulyNEXT()
{

if ((this.menuHienTai == "TEST/PROG 60") || (this.menuHienTai == "PARA/PRINT 80") || (this.menuHienTai == "FAIL/DISP 52")  )
 {
	this.DocThongTinMenuTruoc("LOC/MAIN");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 } 


 if (this.menuHienTai == "MODE/PROG 10")
 {
	this.DocThongTinMenuTruoc("LOC/MAIN");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 } 


  if (this.menuHienTai == "MODE/DISP 21")
 {
	this.DocThongTinMenuTruoc("LOC/MAIN");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 } 
 if (this.menuHienTai == "MODE/DISP 20")
 {
	this.DocThongTinMenuTruoc("MODE/DISP 21");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 

 
   if (this.menuHienTai == "PARA/DISP 31")
 {
	this.DocThongTinMenuTruoc("LOC/MAIN");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 } 
 if (this.menuHienTai == "PARA/DISP 30")
 {
	this.DocThongTinMenuTruoc("PARA/DISP 31");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 
 
 
   if (this.menuHienTai == "PARA/PROG 46")
 {
	this.DocThongTinMenuTruoc("LOC/MAIN");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 } 
 if (this.menuHienTai == "PARA/PROG 45")
 {
	this.DocThongTinMenuTruoc("PARA/PROG 46");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 
  if (this.menuHienTai == "PARA/PROG 44")
 {
	this.DocThongTinMenuTruoc("PARA/PROG 45");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 
  if (this.menuHienTai == "PARA/PROG 43")
 {
	this.DocThongTinMenuTruoc("PARA/PROG 44");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 
  if (this.menuHienTai == "PARA/PROG 42")
 {
	this.DocThongTinMenuTruoc("PARA/PROG 43");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 
 if (this.menuHienTai == "PARA/PROG 41")
 {
	this.DocThongTinMenuTruoc("PARA/PROG 42");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
  if (this.menuHienTai == "FAIL/DISP 51")
 {
	this.DocThongTinMenuTruoc("FAIL/DISP 52");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 
 if (this.menuHienTai == "FAIL/DISP 50")
 {
	this.DocThongTinMenuTruoc("FAIL/DISP 51");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 
 
 if (this.menuHienTai == "PARA/PROG 40")
 {
	this.DocThongTinMenuTruoc("PARA/PROG 41");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
	
 }
 
 
   if (this.menuHienTai == "SIGN/DISP 72")
 {
	this.DocThongTinMenuTruoc("LOC/MAIN");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 } 
 if (this.menuHienTai == "SIGN/DISP 71")
 {
	this.DocThongTinMenuTruoc("SIGN/DISP 72");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }

 

 if (this.menuHienTai == "SIGN/DISP 70")
 {
	this.DocThongTinMenuTruoc("SIGN/DISP 71");
		if (this.soMenu > 0)
		{
			this.dongHienTai = 0;
			this.HienThiThongTin();
		}
 }
 

 //m_hinh.DocThongTinMenu("LOC/MAIN");

 
}

function xuLyQuickRead()
{
	//dat dang menu lai la QuickRead
	this.dangMenu = 3;
	//dat menu hien tai cua QuickRead la 1
	this.menuQuickReadHienTai =1;
	//dat lai gia tri duoc cap nhat
	this.duocCapNhat ="NO";
	if(this.timeID!="")
		clearInterval(this.timeID);
	//bat dau doc QuickRead
	this.DocQuickRead();
	//hien thi menu 1
	while (this.myTable.rows.length>0) 
		this.myTable.deleteRow(0);
	for (var i=0;i<3;i++)
	{
		tr = this.myTable.insertRow(-1);
		td = tr.insertCell(0);
		td.innerHTML = this.mangThongTinMenu[i*4];
		td = tr.insertCell(1);
		td.innerHTML = this.mangThongTinMenu[i*4+1];
		td = tr.insertCell(2);
		td.innerHTML = this.mangThongTinMenu[i*4+2];
		td = tr.insertCell(3);
		td.innerHTML = this.mangThongTinMenu[i*4+3];
	}
}
function xuLyNutCong()
{
	if (this.dangMenu == 2)
	{
		var sGiaTriHienTai = this.mangGiaTriCanCapNhat[this.viTriCapNhat];
		//myTableng gia tri len 1 sao cho van nho hon gia tri max
		var giaTriHienTai = parseInt(sGiaTriHienTai);
		if (!isNaN(giaTriHienTai)) //chuyen qua dang so duoc
		{
			var chuoiSo = giaTriHienTai.toString();
			var sPhanDau = sGiaTriHienTai.substring(0,sGiaTriHienTai.indexOf(chuoiSo));
			var sPhanSau = sGiaTriHienTai.substring(sGiaTriHienTai.indexOf(chuoiSo)+chuoiSo.length);
			var giaTriMax = parseInt(this.mangGiaTriMaxTuongUngTheoViTri[this.viTriCapNhat]);
			if(giaTriHienTai < giaTriMax)
			{
				giaTriHienTai +=1;	
				chuoiSo = giaTriHienTai.toString();
				this.mangGiaTriCanCapNhat[this.viTriCapNhat]= sPhanDau + chuoiSo + sPhanSau;
				var dong = parseInt(this.mangViTriCapNhat[this.viTriCapNhat])/3;
				var cot = parseInt(this.mangViTriCapNhat[this.viTriCapNhat])%3;
				this.myTable.rows[dong].cells[cot].innerText = sPhanDau + chuoiSo + sPhanSau;
			}
		}			
	}
	if (this.dangMenu==1)
	{
		var c = this.myTable.rows[0].cells[0];
		var temp = c.innerText;
		if (temp.indexOf('tone')> 0 && temp.indexOf(' off')>0)
		{
			temp = temp.replace(' off',' on');
			c.innerHTML =temp;
			
			//thay doi trong xml luon
			var oNodeList = xmlDoc.getElementsByTagName('Menu');
			//tim trong file XML co menu nao co ten nhu tren hay khong
			for (i=0;i<oNodeList.length;i++)
			{	
				var node = oNodeList.item(i);
				if (node.attributes.getNamedItem('ten').nodeValue == this.menuHienTai)
				{
					node.childNodes(0).attributes.getNamedItem('ten').nodeValue =temp;
				}
			}
		}
	}
	
}
function xuLyNutTru()
{
	if (this.dangMenu == 2)
	{
		var sGiaTriHienTai = this.mangGiaTriCanCapNhat[this.viTriCapNhat];
		//myTableng gia tri len 1 sao cho van nho hon gia tri max
		var giaTriHienTai = parseInt(sGiaTriHienTai);
		if (!isNaN(giaTriHienTai)) //chuyen qua dang so duoc
		{
			var chuoiSo = giaTriHienTai.toString();
			var sPhanDau = sGiaTriHienTai.substring(0,sGiaTriHienTai.indexOf(chuoiSo));
			var sPhanSau = sGiaTriHienTai.substring(sGiaTriHienTai.indexOf(chuoiSo)+chuoiSo.length);
			var giaTriMin = parseInt(this.mangGiaTriMinTuongUngTheoViTri[this.viTriCapNhat]);
			if(giaTriHienTai > giaTriMin)
			{
				giaTriHienTai -=1;	
				chuoiSo = giaTriHienTai.toString();
				this.mangGiaTriCanCapNhat[this.viTriCapNhat]= sPhanDau + chuoiSo + sPhanSau;
				var dong = parseInt(this.mangViTriCapNhat[this.viTriCapNhat])/3;
				var cot = parseInt(this.mangViTriCapNhat[this.viTriCapNhat])%3;
				this.myTable.rows[dong].cells[cot].innerText = sPhanDau + chuoiSo + sPhanSau;
			}
		}			
	}
	if (this.dangMenu==1)
	{
		var c = this.myTable.rows[0].cells[0];
		var temp = c.innerText;
		if (temp.indexOf('tone')> 0 && temp.indexOf(' on')>0)
		{
			temp = temp.replace(' on',' off');
			c.innerHTML =temp;
			
			//thay doi trong xml luon
			var oNodeList = xmlDoc.getElementsByTagName('Menu');
			//tim trong file XML co menu nao co ten nhu tren hay khong
			for (i=0;i<oNodeList.length;i++)
			{	
				var node = oNodeList.item(i);
				if (node.attributes.getNamedItem('ten').nodeValue == this.menuHienTai)
				{
					node.childNodes(0).attributes.getNamedItem('ten').nodeValue =temp;
				}
			}
		}
	}	
}


