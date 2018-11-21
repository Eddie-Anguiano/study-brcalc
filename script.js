/*eslint-env browser*/


var sales,
	salesPer,
	walkTips,
	numServers,
	walkPerServer,
	totalTips,
	totalTipOut,
	ccTips,
	cashTips,
	mdrTips,
	button,
	expoTips,
	busTips,
	barTips,
	cashOwed,
	perServerTips,
	expoTipsPerServer,
	busTipsPerServer,
	barTipsPerServer,
	totalTipOutPerServer;
var remaindersArray = [];

button = document.getElementById("button");

button.addEventListener("click", function () {
	sales = document.getElementById("salesInput");

	ccTips = document.getElementById("ccTipsInput");

	cashTips = document.getElementById("cashTipsInput");

	mdrTips = document.getElementById("mdrInput");

	numServers = document.getElementById("numServers");

	validateInputArray(inputsArray);

	sales = parseFloat(sales.value);
	ccTips = parseFloat(ccTips.value);
	cashTips = parseFloat(cashTips.value);
	mdrTips = parseFloat(mdrTips.value);
	numServers = parseInt(numServers.value);

	calculate();
	print();
	remainders();

	button.style.display = "none";
	fieldsetBottom();
	iconCircles();
});

function calculate() {
	//The sales per server
	salesPer = round(sales / numServers);
	//All tips made on night
	totalTips = ccTips + cashTips;
	//Tips before tip out per server
	perServerTips = round(totalTips / numServers);
	//Tip out by position
	expoTips = round(totalTips * 0.05);
	busTips = round(mdrTips * 0.1);
	barTips = round(totalTips * 0.05);
	//Tip out by positon per server
	expoTipsPerServer = round(expoTips / numServers);
	busTipsPerServer = round(busTips / numServers);
	barTipsPerServer = round(barTips / numServers);
	//All tips out
	totalTipOut = expoTips + busTips + barTips;
	//Total tip out per server
	totalTipOutPerServer = expoTipsPerServer + busTipsPerServer + barTipsPerServer;
	//total tips after tip out
	walkTips = totalTips - totalTipOut;
	//what each server made after tip out
	walkPerServer = round(walkTips / numServers);
	//cash owed to each server
	cashOwed = round(cashTips / numServers);
}

function print() {
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
	spanRunTotalTipOut.textContent = "  $" + expoTips.toFixed(2);
	spanTotalTotalTipOut.textContent = "  $" + totalTipOut.toFixed(2);
}

function remainders() {
	var salesPerRemainder = (sales - (salesPer * numServers)).toFixed(2);
	remaindersArray.push(salesPerRemainder);

	var tipsPerRemainder = (totalTips - (perServerTips * numServers)).toFixed(2);
	remaindersArray.push(tipsPerRemainder);

	var busTipPerRemainder = (busTips - (busTipsPerServer * numServers)).toFixed(2);
	remaindersArray.push(busTipPerRemainder);

	var barTipPerRemainder = (barTips - (barTipsPerServer * numServers)).toFixed(2);
	remaindersArray.push(barTipPerRemainder);

	var expoTipPerRemainder = (expoTips - (expoTipsPerServer * numServers)).toFixed(2);
	remaindersArray.push(expoTipPerRemainder);

	var totalTipOutPerRemainder = (totalTipOut - (totalTipOutPerServer * numServers)).toFixed(2);
	remaindersArray.push(totalTipOutPerRemainder);

	var cashOwedPerRemainder = (cashTips - (cashOwed * numServers)).toFixed(2);
	remaindersArray.push(cashOwedPerRemainder);

	var totalwalkPerRemainder = (walkTips - (walkPerServer * numServers)).toFixed(2);
	remaindersArray.push(totalwalkPerRemainder);

	var remainderSpan = document.getElementsByClassName("remain");

	for (var i = 0; i < remainderSpan.length; i++) {
		if (remaindersArray[i] > 0) {
			remainderSpan[i].textContent = "  (remainder: $" + remaindersArray[i] + ")";
		}
	}
}

function round(number) {
	return Math.floor(number * Math.pow(10, 2)) / Math.pow(10, 2);
}
var inputsArray = document.getElementsByTagName("input");

function validateInputArray(array) {

	for (var i = 0; i < array.length; i++) {
		if (array[i].value === "") {
			array[i].value = 0;
		}
	}
}

function fieldsetBottom() {
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

//toggle button
var toggleButton = document.getElementById("toggleWrapper");

toggleButton.addEventListener("click", function () {
	function toggleClasses() {
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
	toggleClasses();
})
