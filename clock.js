
var $ = function( id ) { return document.getElementById( id ); };
var _ = function( cl ) { return document.getElementsByClassName( cl ); };

function timeH() {
	//returns the hour (0-11)
	var today = new Date();
	var fetch = today.getHours();
	var fetchM = today.getMinutes();
	var h;
	//return fetch;
	if (fetch<12) h=fetch;
	if (fetch>11) h=fetch-12;
	if (fetchM>39) h++;
	if (h==12) h=0;
	return h;
	}
console.log(timeH())

function timeM() {
	//returns the minute, processed for the 
	//relevant clock operations as index/ices
	//of minute_ids array below

	var today = new Date();
	var fetch = today.getMinutes();
	var m;
	var n;
	var o;
	if (fetch<5) m = 7;
	if (5<=fetch) m = 3;
	if (10<=fetch) m = 4;
	if (15<=fetch) m = 5;
	if (20<=fetch) m = 0;
	if (25<=fetch) m = 0, n=2, o=3;
	if (30<=fetch) m=6, n=undefined, o=undefined;
	if (35<=fetch) m=1, n=2, o=3;
	if (40<=fetch) m=0, n=undefined, o=undefined;
	if (45<=fetch) m=5;
	if (50<=fetch) m=4;
	if (fetch>=55) m=3;
	
	return [m, n, o];
	}

function timeF() {
	//returns the relevant fugal word (aka "past"/"to")
	var today = new Date();
	var fetch = today.getMinutes();
	var f;
	if (fetch<40) f=1;
	if (fetch<5) f=undefined;
	if (fetch>=40) f=0;
	return f;
}




//take each class and create an array with all the objects of said class
var ms = _('minutes')
var fs = _('fugal')
var hs = _('hours')

minute_ids = []
fugal_ids = []
hour_ids = []

for (i=0; i<ms.length; i++) {minute_ids.push(ms[i].id);};
for (i=0; i<fs.length; i++) {fugal_ids.push(fs[i].id);};
for (i=0; i<hs.length; i++) {hour_ids.push(hs[i].id);};



//continually cycle through 'highlight()' function 
let timer = setInterval(highlight, 1000)

function highlight() {

	var minute_id = [$(minute_ids[timeM()[0]]),
					 $(minute_ids[timeM()[1]]),
					 $(minute_ids[timeM()[2]])];
	

	var fugal_id = $(fugal_ids[timeF()]);
	var hour_id = $(hour_ids[timeH()]);

	minute_id[0].classList.add('hl');
	
	if (minute_id[1] && minute_id[2]) {
		minute_id[1].classList.add('hl');
		minute_id[2].classList.add('hl');
	  }
	if (fugal_id) fugal_id.classList.add('hl');
	hour_id.classList.add('hl');


	//creates array of ids of elements with class tag 'hl'
	var hlt_id = [];
	for (i=0; i<_('hl').length; i++) {hlt_id.push(_('hl')[i].id);};
	//create array from full HTML objects
	var hlts = [];
	for (i=0; i<hlt_id.length; i++) {
	hlts.push($(hlt_id[i]));
	}

	//for each element in the highlight array:
	//if it does NOT match the current hour element AND
	//it is NOT a member of the array of current minute elements AND
	//it does NOT match the current fugal element
	//then remove its 'hl' tag
	for (i=0; i<hlts.length; i++) {
		if ((hour_id != hlts[i]) && 
			!(minute_id.includes(hlts[i])) && 
			(fugal_id != hlts[i])) {

			hlts[i].classList.remove('hl');

		}
	}
	
  }



