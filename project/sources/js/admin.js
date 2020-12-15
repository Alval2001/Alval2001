var itemElement = document.getElementsByClassName('departments')[0];
var depsCreated = 0;
var itemID = 0;

var monthToNum = {
	'Jan' : 1
}
//Обработчик выпадающего цикла в районах москвы
var regions = {
	bez: ["Без разницы"],
 	cent: ["Без разницы", "Арбат","Басманный","Замоскворечье","Красносельский","Мещанский","Пресненский","Таганский","Тверской","Хамовники","Якиманка"],
 	sev: ["Без разницы", "Аэропорт","Беговой","Бескудниковский","Войковский","Восточное Дегунино", "Головинский","Дмитровский","Западное Дегунино","Коптево","Левобережный","Молжаниновский","Савёловский","Сокол","Тимирязевский","Ховрино","Хорошёвский"],
	sev_vost: ["Без разницы", "Алексеевский","Алтуфьевский","Бабушкинский","Бибирево","Бутырский","Лианозово","Лосиноостровский","Марфино","Марьина роща","Останкинский","Отрадное","Ростокино","Свиблово","Северный","Северное", "Медведково","Южное Медведково","Ярославский"],
	vost: ["Без разницы", "Богородское","Вешняки","Восточный","Восточное Измайлово","Гольяново","Ивановское","Измайлово","Косино-Ухтомский","Метрогородок","Новогиреево","Новокосино","Перово","Преображенское","Северное Измайлово","Соколиная Гора","Сокольники"],
	y_vost: ["Без разницы", "Выхино-Жулебино","Капотня","Кузьминки","Лефортово","Люблино","Марьино","Некрасовка","Нижегородский","Печатники","Рязанский","Текстильщики","Южнопортовый"],
	y: ["Без разницы", "Бирюлёво","Восточное Бирюлёво","Западное Братеево","Даниловский","Донской","Зябликово","Москворечье-Сабурово","Нагатино-Садовники","Нагатинский Затон","Нагорный","Орехово-Борисово Северное","Орехово-Борисово Южное","Царицыно","Чертаново Северное","Чертаново Центральное","Чертаново Южное"],
	y_zap: ["Без разницы", "Академический","Гагаринский","Зюзино","Коньково","Котловка","Ломоносовский","Обручевский","Северное Бутово","Тёплый Стан","Черёмушки","Южное Бутово","Ясенево"],
	zap: ["Без разницы", "Внуково","Дорогомилово","Крылатское","Кунцево","Можайский","Ново-Переделкино","Очаково-Матвеевское","Проспект Вернадского","Раменки","Солнцево","Тропарёво-Никулино","Филёвский Парк","Фили-Давыдково"],
 	sev_zap: ["Без разницы", "Куркино","Митино","Покровское-Стрешнево","Северное Тушино","Строгино","Хорошёво-Мнёвники","Щукино","Южное", "Тушино"]}
var okrug1 = document.getElementsByClassName("okrug")[0];
var okrugModal = document.getElementsByClassName("modalAddokrug")[0];
var regionSet = document.querySelector(".region");
var modalRegionSet = document.querySelector(".modalAddRegion");

function selectokrug(ev){
	modalRegionSet.innerHTML = "";
  	regionSet.innerHTML = "";
  	var c = this.value || "cent", o;
  	for(let i = 0; i < regions[c].length; i++){
	    o = new Option(regions[c][i],i,false,false);
	    regionSet.add(o);

	}
	for(let i = 0; i < regions[c].length -1; i++){
		o = new Option(regions[c][i+1],i,false,false);
		modalRegionSet.add(o);
	}
}

function hideDepBtn()
{
	if (document.querySelector('.departments ').innerHTML != "\n                    \n            ")
	{
		if (document.getElementsByClassName('depsMenu')[0].hidden == false)
		{
		document.querySelector('.hideDepBtn').innerHTML = 'Скрыть';
		document.getElementsByClassName('depsMenu')[0].hidden = true;
		document.getElementsByClassName('departments')[0].hidden = true;		
		}
		else
		{
		document.querySelector('.hideDepBtn').innerHTML = 'Показать';
		document.getElementsByClassName('depsMenu')[0].hidden = false;
		document.getElementsByClassName('departments')[0].hidden = false;
		}
	}
}

function getAlert(atr)
{

	if (atr == 'Заведений не найдено')
	{
		document.querySelector('.alertNoDepsFind').removeAttribute('hidden');
	}

	if (atr == 'Не все поля')
	{
		document.querySelector('.modalAddNoFields').removeAttribute('hidden');
	}

	setTimeout(function()
		{
			document.querySelector('.alertNoDepsFind').setAttribute('hidden','true');
			document.querySelector('.modalAddNoFields').setAttribute('hidden','true');
		}, 10000);
}

function checkSits(record, from, to)
{
	if (to == '')
	{
		to = '999999'
	}
	if (record.seatsCount >= Number(from) && record.seatsCount <= Number(to))
	{
		return true;
	}
	return false;
}

function checkDate(record, from, to)
{
	recordDays = new Date(record.created_at); 
	fromDays = new Date(from.slice(6) , from.slice(3,5) -1, from.slice(0,2));
	toDays = new Date(to.slice(6) , to.slice(3,5) -1, to.slice(0,2));

	if (recordDays <= toDays && recordDays >= fromDays)
	{

		return true;
	}
	return false;
}

function createDepID(record)
{
	let itemElement2 = document.createElement('div');
    itemElement2.classList.add("col-md-1","col-sm-1", "py-4", "border-bottom", "border-dark", "nameDep" + String(depsCreated + 1));
    itemElement2.innerHTML = record.id;
    return itemElement2;
}

function createDepName(record)
{
    let itemElement2 = document.createElement('div');
    itemElement2.classList.add("col-md-3","col-sm-3", "py-4", "border-bottom", "border-dark", "nameDep" + String(depsCreated + 1));
    itemElement2.innerHTML = record.name;
    return itemElement2;
}

function createDepType(record)
{
	let itemElement2 = document.createElement('div');
    itemElement2.classList.add("col-md-2", "col-sm-2","py-4", "border-bottom", "border-dark", "typeDep" +String(depsCreated+1));
    itemElement2.innerHTML = record.typeObject;
    return itemElement2;
}

function createDepAdress(record)
{
	let itemElement2 = document.createElement('div');
    itemElement2.classList.add("col-md-3","col-sm-3", "py-4", "border-bottom", "border-dark", "adressDep" + String(depsCreated+1));
    itemElement2.innerHTML = record.address;
    return itemElement2;
}

function createDepChooseBtn1(record)
{
	let itemElement2 = document.createElement('div');
    itemElement2.classList.add("col-md-1","col-sm-1", "border-bottom", "border-dark", "py-4");
    itemElement2.innerHTML = '<button class="btn btn-outline-secondary  btn-block chooseDepBtn'+String(depsCreated+1)+' jsonID'+(itemID-1)+'" onclick="chooseDepBtn(this)">o</button>';
    return itemElement2;
}

function createDepChooseBtn2(record)
{
	let itemElement2 = document.createElement('div');
    itemElement2.classList.add("col-md-1","col-sm-1", "border-bottom", "border-dark", "py-4");
    itemElement2.innerHTML = '<button class="btn btn-outline-secondary  btn-block editDepBtn'+String(depsCreated+1)+' jsonID'+(itemID-1)+'" onclick="editDepBtn(this)"><></button>';
    return itemElement2;
}

function createDepChooseBtn3(record)
{
	let itemElement2 = document.createElement('div');
    itemElement2.classList.add("col-md-1","col-sm-1", "border-bottom", "border-dark", "py-4");
    itemElement2.innerHTML = '<button class="btn btn-outline-secondary  btn-block deleteDepBtn'+String(depsCreated+1)+' jsonID'+(itemID-1)+'" onclick="deleteDepBtn(this)">x</button>';
    return itemElement2;
}

function createListItemElement(records) {

	itemElement.append(createDepID(records));
    itemElement.append(createDepName(records));
    itemElement.append(createDepType(records));
    itemElement.append(createDepAdress(records));
    itemElement.append(createDepChooseBtn1(records));
    itemElement.append(createDepChooseBtn2(records));
    itemElement.append(createDepChooseBtn3(records));
    depsCreated+=1;
   
}

function checkGlob(record, globFlag)
{
	if (globFlag == 'Без разницы'){ return true;}
	if (globFlag == 'Да' && record.operatingCompany != ''){return true;}
	if (globFlag == 'Нет' && record.operatingCompany == ''){return true;}
	return false;
}

function checkSocSalе(record, socFlag)
{
	if (socFlag == 'Без разницы'){ return true;}
	if (socFlag == 'Есть' && record.socialPrivileges == '1'){return true;}
	if (socFlag == 'Нет' && record.socialPrivileges == '0'){return true;}
	return false;
}

function checkJSON(records){

    let okrug = document.querySelector('.okrug').options[document.querySelector('.okrug').selectedIndex].text + ' административный округ';
    let region = document.querySelector('.region').options[document.querySelector('.region').selectedIndex].text;
    let typeDep = document.querySelector('.typeDep').value;
    let socSale = document.querySelector('.socSale').options[document.querySelector('.socSale').selectedIndex].text;
    let nameDep = document.querySelector('.nameDep').value;
    let isGlob = document.querySelector('.isGlob').options[document.querySelector('.isGlob').selectedIndex].text;
    let sitFrom =document.querySelector('.sitFrom').value;
    let sitTo = document.querySelector('.sitTo').value;
    let dateFrom = document.querySelector('.dateFrom').value;
    let dateTo = document.querySelector('.dateTo').value;

    itemID = 0;
    depsCreated = 0;
    for (let i = 0; i < records.length; i++)
    {
    	itemID += 1;
    	itemElement = document.getElementsByClassName('departments')[0];
	    if (okrug == records[i].admArea || okrug == 'Без разницы административный округ')
	    {
	    	if (true)//records[i].district.includes(region) || region == 'Без разницы')
	    	{
		    	if (typeDep == '' || (records[i].typeObject).includes(typeDep))
		    	{
		    		if (nameDep == '' || (records[i].name).includes(nameDep))
		    		{
		    			if (checkDate(records[i], dateFrom, dateTo) || dateTo == '')
		    			{
		    				if (checkSits(records[i], sitFrom, sitTo))
		    				{
		    					if (checkGlob(records[i], isGlob))
		    					{
		    						if (checkSocSalе(records[i], socSale))
		    						{
		    							createListItemElement(records[i]);
		    						}
		    					}
		    				}
		    			}
		    		}
		    	}
	    	}
	    }

	}

	if (depsCreated == 0)
	{
		getAlert('Заведений не найдено');
		document.getElementsByClassName('depsMenu')[0].hidden = true;
		document.getElementsByClassName('departments')[0].hidden = true;
	}
}



function findDepBtn()
{
		document.getElementsByClassName('depsMenu')[0].hidden = false;
		document.getElementsByClassName('departments')[0].hidden = false;

		itemElement.innerHTML = '';
    	let url = new URL(document.querySelector('.depContainer').dataset.url);

    	var request = new XMLHttpRequest();
    	request.open('GET', url);
    	request.responseType = 'json';
		request.send();
		request.onload = function() {
		  	var AYE = request.response;
		  	checkJSON(AYE);
		}
}

async function sendJson(item)
{
	const response = await fetch('http://exam-2020-1-api.std-900.ist.mospolytech.ru/api/data1', {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await response.json();
  console.log('Успех:', JSON.stringify(json));
}

function addJsonBtn()
{
	if (document.querySelector('.modalAddName').value == '' ||document.querySelector('.modalAddOrg').value == '' ||document.querySelector('.modalAddType').value == '' ||document.querySelector('.modalAddAdress').value == '' ||document.querySelector('.modalAddSitCount').value == '' ||document.querySelector('.modalAddTelep').value == '' || document.querySelector('.modalAddRegion').value ==  '')
	{
		getAlert('Не все поля');
	}
	else
	{
		var jsonName =document.querySelector('.modalAddName').value.replaceAll(' ', '+');
		var jsonGlob = 0;
		if (document.querySelector('.modalAddIsGlob').value == 'Да')
		{
			jsonGlob = 1;
		}
		var jsonOrg = document.querySelector('.modalAddOrg').value.replaceAll(' ', '+');
		var jsonType =document.querySelector('.modalAddType').value.replaceAll(' ', '+');
		var jsonOkrug = (document.querySelector('.modalAddokrug').options[document.querySelector('.modalAddokrug').selectedIndex].text + ' административный округ').replaceAll(' ', '+');
		var jsonDistrict = document.querySelector('.modalAddRegion').options[document.querySelector('.modalAddRegion').selectedIndex].text.replaceAll(' ', '+');
		var jsonAdress =document.querySelector('.modalAddAdress').value.replaceAll(' ', '+');
		var jsonSits =Number(document.querySelector('.modalAddSitCount').value.replaceAll(' ', '+'));
		var jsonSoc =0;
		if (document.querySelector('.modalAddSocSale').value == 'Да')
		{
			jsonSoc = 1;
		}
		var jsonTel = document.querySelector('.modalAddTelep ').value.replaceAll(' ', '+');
	



	
		let ayeaye = {
			api_key: '9b5072bc-c563-49a1-82e7-23f81b831a1e',
	  		name: jsonName,
			isNetObject: jsonGlob,
			operatingCompany: jsonOrg,
			typeObject: jsonType,
			admArea: jsonOkrug,
			district: jsonDistrict,
			address: jsonAdress,
			seatsCount: jsonSits,
			socialPrivileges: jsonSoc,
			publicPhone: jsonTel
			};
		sendJson(ayeaye);
	}	
}

window.onload = function () {
	okrug1.onload = selectokrug;
    okrug1.onchange = selectokrug;

    okrugModal.onload = selectokrug;
    okrugModal.onchange = selectokrug;
}