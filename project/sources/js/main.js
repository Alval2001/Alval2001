var depsCreated = 0;
var itemElement = document.getElementsByClassName('departments')[0];
//Обработчик выпадающего цикла в районах москвы
var regions = {
 	cent: ["Арбат","Басманный","Замоскворечье","Красносельский","Мещанский","Пресненский","Таганский","Тверской","Хамовники","Якиманка"],
 	sev: ["Аэропорт","Беговой","Бескудниковский","Войковский","Восточное Дегунино", "Головинский","Дмитровский","Западное Дегунино","Коптево","Левобережный","Молжаниновский","Савёловский","Сокол","Тимирязевский","Ховрино","Хорошёвский"],
	sev_vost: ["Алексеевский","Алтуфьевский","Бабушкинский","Бибирево","Бутырский","Лианозово","Лосиноостровский","Марфино","Марьина роща","Останкинский","Отрадное","Ростокино","Свиблово","Северный","Северное", "Медведково","Южное Медведково","Ярославский"],
	vost: ["Богородское","Вешняки","Восточный","Восточное Измайлово","Гольяново","Ивановское","Измайлово","Косино-Ухтомский","Метрогородок","Новогиреево","Новокосино","Перово","Преображенское","Северное Измайлово","Соколиная Гора","Сокольники"],
	y_vost: ["Выхино-Жулебино","Капотня","Кузьминки","Лефортово","Люблино","Марьино","Некрасовка","Нижегородский","Печатники","Рязанский","Текстильщики","Южнопортовый"],
	y: ["Бирюлёво","Восточное Бирюлёво","Западное Братеево","Даниловский","Донской","Зябликово","Москворечье-Сабурово","Нагатино-Садовники","Нагатинский Затон","Нагорный","Орехово-Борисово Северное","Орехово-Борисово Южное","Царицыно","Чертаново Северное","Чертаново Центральное","Чертаново Южное"],
	y_zap: ["Академический","Гагаринский","Зюзино","Коньково","Котловка","Ломоносовский","Обручевский","Северное Бутово","Тёплый Стан","Черёмушки","Южное Бутово","Ясенево"],
	zap: ["Внуково","Дорогомилово","Крылатское","Кунцево","Можайский","Ново-Переделкино","Очаково-Матвеевское","Проспект Вернадского","Раменки","Солнцево","Тропарёво-Никулино","Филёвский Парк","Фили-Давыдково"],
 	sev_zap: ["Куркино","Митино","Покровское-Стрешнево","Северное Тушино","Строгино","Хорошёво-Мнёвники","Щукино","Южное", "Тушино"]}
var okrug = document.getElementsByClassName("okrug")[0];
var regionSet = document.querySelector(".region");
//Обработчик выпадающего цикла в районах москвы
function selectokrug(ev){
  	regionSet.innerHTML = "";
  	var c = this.value || "cent", o;
  	for(let i = 0; i < regions[c].length; i++){
	    o = new Option(regions[c][i],i,false,false);
	    regionSet.add(o);
	}
}


//Расчет финальной цены. Вызывать при каждом изменении цены
function globalCost()
{
	var finalCost = 0;
	var multiplier = 1;
	var studMultiplier = 0.90;
	var fastCost = 400;

	if(document.getElementById('isStudent').checked)multiplier*=studMultiplier;
	if(document.getElementById('isFastDel').checked) finalCost+=fastCost;


	[].forEach.call(document.querySelectorAll('.costMenu'), function(item) {
	 	finalCost+=Number(item.value) * Number(item.parentElement.getElementsByClassName('priceMenu')[0].textContent.substring(0, item.parentElement.getElementsByClassName('priceMenu')[0].textContent.length - 1));
	});

	finalCost*=multiplier;
	document.getElementsByClassName('finalCost')[0].textContent = 'Итого: ' + finalCost + '₽';
}

//обработчик нажатия на доп опции
[].forEach.call(document.querySelectorAll('.costOption'), function(item) {
	 item.addEventListener('click', function() {
	    globalCost();
	});
});

//Обработчик нажатия на минус
[].forEach.call(document.querySelectorAll('.minusBtn'), function(item) {
	 item.addEventListener('click', function() {
	 	if (this.parentElement.getElementsByClassName('costMenu')[0].value>0)
	 	{
	    this.parentElement.getElementsByClassName('costMenu')[0].value-=1;
	    globalCost();
	    }
	});
});

//обработчик выбора заведения
function chooseDepBtn(but)
{

	if (but.innerHTML == 'Выбрать')
	{
		for (var i = document.querySelector('.departments').querySelectorAll('.btn').length - 1; i >= 0; i--)
		{
			document.querySelector('.departments').querySelectorAll('.btn')[i].setAttribute('disabled', 'true');
		}

		but.innerHTML = 'Отменить'
		but.removeAttribute('disabled');
		but.setAttribute('class',but.getAttribute('class')+' selectedDep' )

	}
	else
	{
		for (var i = document.querySelector('.departments').querySelectorAll('.btn').length - 1; i >= 0; i--)
		{
			document.querySelector('.departments').querySelectorAll('.btn')[i].removeAttribute('disabled');
		}

		but.innerHTML = 'Выбрать'
		but.setAttribute('class',but.getAttribute('class').slice(0, -12))
	}
	
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
    itemElement2.classList.add("col-md-3", "col-sm-3","py-4", "border-bottom", "border-dark", "typeDep" +String(depsCreated+1));
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

function createDepChooseBtn(record)
{
	let itemElement2 = document.createElement('div');
    itemElement2.classList.add("col-md-3","col-sm-3", "border-bottom", "border-dark", "py-4");
    itemElement2.innerHTML = '<button class="btn btn-outline-secondary  btn-block chooseDepBtn'+String(depsCreated+1)+'" onclick="chooseDepBtn(this)">Выбрать</button>';
    return itemElement2;
}

//Рендерит и создает 1 элемент (По сути 4. 1 строку)
function createListItemElement(records) {

    itemElement.append(createDepName(records));
    itemElement.append(createDepType(records));
    itemElement.append(createDepAdress(records));
    itemElement.append(createDepChooseBtn(records));

    depsCreated+=1;
   
}
//depsList.append(createListItemElement(records[i]));
//Направляет записи на рендер
function checkJSON(records){

	let perPage = document.querySelector('.perPageForm').value;
    let okrug = document.querySelector('.okrug').options[document.querySelector('.okrug').selectedIndex].text + ' административный округ';
    let region = document.querySelector('.region').options[document.querySelector('.region').selectedIndex].text;
    let typeDep = document.querySelector('.typeDep').value;
    let socSale = document.querySelector('.socSale').options[document.querySelector('.socSale').selectedIndex].text;
    depsCreated = 0;
    for (let i = 0; i < records.length; i++)
    {
    	itemElement = document.getElementsByClassName('departments')[0];
	    if (okrug == records[i].admArea && (records[i].district).includes(region))
	    {
	    	
	    	if (typeDep == '' || (records[i].typeObject).includes(typeDep))
	    	{
	    		if (socSale == 'Есть' && records[i].socialPrivileges == '1')
	    		{
	    			createListItemElement(records[i]);
	    		}
	    		if (socSale == 'Без разницы')
	    		{
	    			createListItemElement(records[i]);
	    		}
	    		if (socSale == 'Нет' && records[i].socialPrivileges == '0')
	    		{
	    			createListItemElement(records[i]);
	    		}
	    	}
	    }

	}
	console.log('1');
	if (depsCreated == 0)
	{
		console.log('2');
		getAlert('Заведений не найдено');
		document.getElementsByClassName('depsMenu')[0].hidden = true;
		document.getElementsByClassName('departments')[0].hidden = true;
	}
}

//Обработчик уведомлений
function getAlert(atr)
{
	if (atr == 'Нет заведения')
	{
		document.querySelector('.alertNoDep').removeAttribute('hidden');
	}
	if (atr == 'Нет блюд')
	{
		document.querySelector('.alertNoMenu').removeAttribute('hidden');
	}
	if (atr == 'Заведений не найдено')
	{
		document.querySelector('.alertNoDepsFind').removeAttribute('hidden');
	}
	if (atr == 'Не выбраны заведения')
	{
		document.querySelector('.alertNoDepsChoos').removeAttribute('hidden');
	}
	setTimeout(function()
		{
			document.querySelector('.alertNoMenu').setAttribute('hidden','true');
			document.querySelector('.alertNoDep').setAttribute('hidden','true');
			document.querySelector('.alertNoDepsFind').setAttribute('hidden','true');
			document.querySelector('.alertNoDepsChoos').setAttribute('hidden','true');
		}, 10000);
}

//создание еды в модальном окне
function createFoodModal(selectedFood)
{

	var a =
	`
		<img src="sources/img/eda.png" class="mb-2 pt-2 img-fluid col-md-2">

	    <div class="mb-2 pt-4 col-md-3">` +
	        selectedFood.parentElement.getElementsByTagName('h2')[0].innerHTML
	    + `</div >

	    <div  class="mb-2 pt-4 col-md-5">` +
	        selectedFood.parentElement.querySelector('.priceMenu').innerHTML.slice(0, -1) + ` x ` + selectedFood.parentElement.querySelector('.costMenu').value
	    + `</div>

	    <div class="mb-2 pt-4 col-md-2">`+
	        String((Number(selectedFood.parentElement.querySelector('.priceMenu').innerHTML.slice(0, -1)))*(Number(selectedFood.parentElement.querySelector('.costMenu').value)))
	    + `</div>

	`;


	document.querySelector('.pasteFood').innerHTML+=a;
}

//Обработчик модального окна
function renderModal()
{

	document.querySelector('.modal').removeAttribute('id');

	//пустое меню?
	var menuFlag = 0;
	document.querySelectorAll('.costMenu').forEach(function(item){if(item.value != 0)
		{
			menuFlag+=1
		}});
	//выбрано заведение?
	var depFlag = document.querySelector('.selectedDep') != null;

	if (menuFlag != 0) 
	{
		if (depFlag)
		{

			document.querySelector('.modal').setAttribute('id','modalWind');

			//Вычисление финальной стоимости
			document.querySelector('.itogoSum').innerHTML = (document.querySelector('.finalCost').innerHTML).slice(7);
			
			//Иформация о выбранном заведении
			var chosedDepID = document.querySelector('.selectedDep').getAttribute('class').replace('btn btn-outline-secondary  btn-block chooseDepBtn', '').replace(' selectedDep', '');
			document.querySelector('.modalName').innerHTML = document.querySelector('.nameDep' + chosedDepID).innerHTML;
			document.querySelector('.modalOkrug').innerHTML = document.querySelector('.okrug').options[document.querySelector('.okrug').selectedIndex].text + ' административный округ';;
			document.querySelector('.modalRegion').innerHTML = document.querySelector('.region').options[document.querySelector('.region').selectedIndex].text;;
			document.querySelector('.modalAdress').innerHTML = document.querySelector('.adressDep' + chosedDepID).innerHTML;
			document.querySelector('.modalDepType').innerHTML = document.querySelector('.typeDep' + chosedDepID).innerHTML;

			//Показ дополнительных функций
			if(document.querySelector('#isStudent').checked == false)
			{
				document.querySelector('.modalIsStudent').innerHTML = "Нет";
			}
			else
			{
				document.querySelector('.modalIsStudent').innerHTML = "-10%";
			}

			if(document.querySelector('#isFastDel').checked == false)
			{
				document.querySelector('.modalFastDev').innerHTML = "Нет";
			}
			else
			{
				document.querySelector('.modalFastDev').innerHTML = "+400₽";
			}

			//Создание форм под блюда
			document.querySelectorAll('.costMenu').forEach(function(item){if(item.value != 0)
			{
				createFoodModal(item);
			}});

		}

		else
		{
			getAlert('Нет заведения');
		}
	}

	else
	{
		getAlert('Нет блюд');
	}

}

//Обработчик нажатия на кнопку и загрузки заведений
function findDepBtn()
{
	if (document.getElementsByClassName('okrug')[0].value != '' && document.getElementsByClassName('region')[0].value != '')
	{
		document.getElementsByClassName('depsMenu')[0].hidden = false;
		document.getElementsByClassName('departments')[0].hidden = false;
		document.querySelector('.departments ').className= document.querySelector('.departments ').className.slice(0, 68) + document.querySelector('.perPageForm').value;
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
	else
	{
		getAlert('Не выбраны заведения');
	}
}

//Обработчик нажатия на плюс
[].forEach.call(document.querySelectorAll('.plusBtn'), function(item) {
	 item.addEventListener('click', function() {
	    this.parentElement.getElementsByClassName('costMenu')[0].value = Number(this.parentElement.getElementsByClassName('costMenu')[0].value) + 1;
		globalCost();
	});
});

window.onload = function () {
    document.getElementsByClassName("okrug")[0].value = '';
    okrug.onchange = selectokrug;
    //обнуление меню
    document.querySelectorAll('.costMenu').forEach(function(item){item.value = 0});
    //обнуление чекбоксов
    document.querySelector('#isStudent').checked =false;
    document.querySelector('#isFastDel').checked =false;
    
}