/*eslint-env browser*/
var numServers,
	sales,
	ccTips,
	cashTips,
	mdrTips,
	totalTips,
	walkTips,
	busTips,
	barTips,
	totalExpoTips,
	totalTipOut;
var allData = [],
	hourlyServerCount = 0,
	totalHours = 0;
var button = document.getElementById("button"),
	toggleButton = document.getElementById("toggleWrapper"),
	addButton = document.getElementById("addButton"),
	submitHourlybutton = document.getElementById("submitHourly");

function getActiveInputs() {
	sales = document.getElementById("salesInput");
	ccTips = document.getElementById("ccTipsInput");
	cashTips = document.getElementById("cashTipsInput");
	mdrTips = document.getElementById("mdrInput");
	numServers = document.getElementById("numServersInput");


}

function convertInputToFloat() {
	sales = parseFloat(sales.value);
	ccTips = parseFloat(ccTips.value);
	cashTips = parseFloat(cashTips.value);
	mdrTips = parseFloat(mdrTips.value);
	numServers = parseInt(numServers.value);

}

function hideHourlySpecific() {
	var hourlySpecificClasses = document.getElementsByClassName("hourlySpecific");
	for (var i = 0; i < hourlySpecificClasses.length; i++) {
		hourlySpecificClasses[i].style.display = "none";
	}
}

function round(number) {
	return Math.floor(number * Math.pow(10, 2)) / Math.pow(10, 2);
}

function convertTimeToDecimal(hours, mins) {
	var decimalMins = round(mins / 60);
	return hours + decimalMins;
}

function validateInputArray() {
	var inputsArray = document.getElementsByTagName("input");

	for (var i = 0; i < inputsArray.length; i++) {
		if (inputsArray[i].value === "") {
			inputsArray[i].value = 0;
		}
	}
}


button.addEventListener("click", function () {
	var salesPer,
		walkPerServer,
		cashOwed,
		perServerTips,
		expoTipsPerServer,
		busTipsPerServer,
		barTipsPerServer,
		totalTipOutPerServer;
	var defaultRemaindersArray = [];



	function calculateDefault() {
		//The sales per server
		salesPer = round(sales / numServers);
		//All tips made on night
		totalTips = ccTips + cashTips;
		//Tips before tip out per server
		perServerTips = round(totalTips / numServers);
		//Tip out by position
		totalExpoTips = round(totalTips * 0.05);
		busTips = round(mdrTips * 0.1);
		barTips = round(totalTips * 0.05);
		//Tip out by positon per server
		expoTipsPerServer = round(totalExpoTips / numServers);
		busTipsPerServer = round(busTips / numServers);
		barTipsPerServer = round(barTips / numServers);
		//All tips out
		totalTipOut = totalExpoTips + busTips + barTips;
		//Total tip out per server
		totalTipOutPerServer = expoTipsPerServer + busTipsPerServer + barTipsPerServer;
		//total tips after tip out
		walkTips = totalTips - totalTipOut;
		//what each server made after tip out
		walkPerServer = round(walkTips / numServers);
		//cash owed to each server
		cashOwed = round(cashTips / numServers);
	}

	function printDefaultSpans() {
		//Per Server
		var spanSalesOutput = document.getElementById("salesOutput");
		var spanTipsBefore = document.getElementById("tipsBefore");
		var spanBusTipPer = document.getElementById("busTipPer");
		var spanBarTipPer = document.getElementById("barTipPer");
		var spanExpoTipPer = document.getElementById("expoTipPer");
		var spanServerTipOutTotals = document.getElementById("serverTipOutTotals");
		var spanCashOwed = document.getElementById("cashOwed");
		var spanClaimedTips = document.getElementById("claimedTips");
		//Tip Out Totals
		var spanBusTotalTipOut = document.getElementById("busTotalTipOut");
		var spanBarTotalTipOut = document.getElementById("barTotalTipOut");
		var spanRunTotalTipOut = document.getElementById("runTotalTipOut");
		var spanTotalTotalTipOut = document.getElementById("totalTotalTipOut");
		//Per Server
		spanSalesOutput.textContent = "  $" + salesPer.toFixed(2);
		spanTipsBefore.textContent = "  $" + perServerTips.toFixed(2);
		spanBusTipPer.textContent = "  $" + busTipsPerServer.toFixed(2);
		spanBarTipPer.textContent = "  $" + barTipsPerServer.toFixed(2);
		spanExpoTipPer.textContent = "  $" + expoTipsPerServer.toFixed(2);
		spanServerTipOutTotals.textContent = "  $" + totalTipOutPerServer.toFixed(2);
		spanCashOwed.textContent = "  $" + cashOwed.toFixed(2);
		spanClaimedTips.textContent = "  $" + walkPerServer.toFixed(2);
		//Tip Out Totals
		spanBusTotalTipOut.textContent = "  $" + busTips.toFixed(2);
		spanBarTotalTipOut.textContent = "  $" + barTips.toFixed(2);
		spanRunTotalTipOut.textContent = "  $" + totalExpoTips.toFixed(2);
		spanTotalTotalTipOut.textContent = "  $" + totalTipOut.toFixed(2);
	}

	function defaultRemainder() {
		var salesPerRemainder = (sales - (salesPer * numServers)).toFixed(2);
		defaultRemaindersArray.push(salesPerRemainder);

		var tipsPerRemainder = (totalTips - (perServerTips * numServers)).toFixed(2);
		defaultRemaindersArray.push(tipsPerRemainder);

		var busTipPerRemainder = (busTips - (busTipsPerServer * numServers)).toFixed(2);
		defaultRemaindersArray.push(busTipPerRemainder);

		var barTipPerRemainder = (barTips - (barTipsPerServer * numServers)).toFixed(2);
		defaultRemaindersArray.push(barTipPerRemainder);

		var expoTipPerRemainder = (totalExpoTips - (expoTipsPerServer * numServers)).toFixed(2);
		defaultRemaindersArray.push(expoTipPerRemainder);

		var totalTipOutPerRemainder = (totalTipOut - (totalTipOutPerServer * numServers)).toFixed(2);
		defaultRemaindersArray.push(totalTipOutPerRemainder);

		var cashOwedPerRemainder = (cashTips - (cashOwed * numServers)).toFixed(2);
		defaultRemaindersArray.push(cashOwedPerRemainder);

		var totalwalkPerRemainder = (walkTips - (walkPerServer * numServers)).toFixed(2);
		defaultRemaindersArray.push(totalwalkPerRemainder);

		var defaultRemainderSpan = document.getElementsByClassName("remain");

		for (var i = 0; i < defaultRemainderSpan.length; i++) {
			if (defaultRemaindersArray[i] > 0) {
				defaultRemainderSpan[i].textContent = "  (remainder: $" + defaultRemaindersArray[i] + ")";
			}
		}
	}

	function fixDefaultDom() {
		function removeButton() {
			button.style.display = "none";
		}

		function removeBorderBottom() {
			var fieldset = document.getElementsByTagName("fieldset")[2];
			fieldset.style.borderBottom = "none";
		}

		function iconCircles() {
			var icon;
			var parent = document.getElementById("serverIcons");

			if (numServers < 30) {
				for (var i = 0; i < numServers; i++) {
					icon = document.createElement("div");
					icon.className = "circles";
					parent.appendChild(icon);
				}
			}
		}


		removeButton();
		removeBorderBottom();
		iconCircles();
	}

	getActiveInputs();
	validateInputArray();
	convertInputToFloat();
	calculateDefault();
	printDefaultSpans();
	defaultRemainder();
	fixDefaultDom();
});
toggleButton.addEventListener("click", function () {
	function toggleSwitchDom() {
		var toggleHeader = document.getElementById("toggleHeader");
		var toggleBackground = document.getElementById("toggleBackground");
		var toggleCircle = document.getElementById("toggleCircle");

		if (toggleHeader.className === "headerClass1 left") {
			toggleHeader.className = "headerClass2 left";
		} else {
			toggleHeader.className = "headerClass1 left";
		}

		if (toggleBackground.className === "backgroundClass1") {
			toggleBackground.className = "backgroundClass2";
		} else {
			toggleBackground.className = "backgroundClass1";
		}

		if (toggleCircle.className === "circleClass1") {
			toggleCircle.className = "circleClass2";
		} else {
			toggleCircle.className = "circleClass1";
		}
	}

	function clearDefaultSpecific() {
		var defaultSpecificClasses = document.getElementsByClassName("defaultSpecific");
		var hourlySpecificClasses = document.getElementsByClassName("hourlySpecific");

		for (var i = 0; i < hourlySpecificClasses.length; i++) {
			hourlySpecificClasses[i].style.display = "";
		}

		for (var j = 0; j < defaultSpecificClasses.length; j++) {
			defaultSpecificClasses[j].style.display = "none";
		}
	}


	toggleSwitchDom();
	clearDefaultSpecific();
})
addButton.addEventListener("click", function () {
	var employeeName = document.getElementById("employeeName").value;
	var hours = parseFloat(document.getElementById("hours").value);
	var mins = parseFloat(document.getElementById("mins").value);
	var employeeTime = convertTimeToDecimal(hours, mins);


	function addHours(array) {
		totalHours = 0;
		for (var i = 0; i < array.length; i++) {
			totalHours += array[i].time;
		}
	}

	function displayHourlyStats() {
		var displayStats = document.querySelector(".hourlyStats");

		displayStats.textContent = " \xa0\xa0\xa0\xa0" + hourlyServerCount + " Servers \xa0\xa0\xa0\xa0Total Hours: " + totalHours.toFixed(2);
	}

	function displayServerList() {
		var ul = document.querySelector(".serverList");
		var li = document.createElement("li");

		li.textContent = "Name: " + allData[hourlyServerCount - 1].name + " \xa0\xa0Hours: " + allData[hourlyServerCount - 1].time;
		ul.appendChild(li);

	}


	allData.push({
		name: employeeName,
		time: employeeTime
	})
	hourlyServerCount += 1;
	addHours(allData);
	displayHourlyStats();
	displayServerList();
	//console.table(allData);
})
submitHourlybutton.addEventListener("click", function () {
	getActiveInputs();
	validateInputArray();
	convertInputToFloat();
	console.table(allData);
})


hideHourlySpecific();
