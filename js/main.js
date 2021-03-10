$('html').localScroll();
$('body').scrollspy({ target: '.navbar-default' })
$('span.grade').tooltip()
$(window).scroll(function() {
    if ($(this).scrollTop()) {
        $('#toTop').fadeIn();
    } else {
        $('#toTop').fadeOut();
    }
});
$("#toTop").click(function() {
    $("html, body").animate({scrollTop: 0}, 1000);
});
var opts = {
  lines: 12,
  angle: 0.5,
  lineWidth: 0.08,
  pointer: {
    length: 0.71,
    strokeWidth: 0.024,
    color: '#000000'
  },
  limitMax: 'false',
  colorStart: '#DFEB44',
  colorStop: '#D0E040',
  strokeColor: '#E0E0E0',
  generateGradient: true
};
var target = document.getElementById('website-circle');
var gauge = new Donut(target).setOptions(opts);
gauge.maxValue = 100;
gauge.animationSpeed = 64;
gauge.set(100);

opts = {
	lines: 12,
	angle: 0.5,
	lineWidth: 0.08,
	pointer: {
		length: 0.71,
		strokeWidth: 0.024,
		color: '#000000'
	},
	limitMax: 'false',
	colorStart: '#2AC96A',
	colorStop: '#20C06A',
	strokeColor: '#E0E0E0',
	generateGradient: true
};
target = document.getElementById('photoshop-circle');
gauge = new Donut(target).setOptions(opts);
gauge.maxValue = 100;
gauge.animationSpeed = 64;
gauge.set(100);

opts = {
	lines: 12,
	angle: 0.5,
	lineWidth: 0.08,
	pointer: {
		length: 0.71,
		strokeWidth: 0.024,
		color: '#000000'
	},
	limitMax: 'false',
	colorStart: '#10A04E',
	colorStop: '#8FC0DA',
	strokeColor: '#E0E0E0',
	generateGradient: true
};
target = document.getElementById('other-circle');
gauge = new Donut(target).setOptions(opts);
gauge.maxValue = 100;
gauge.animationSpeed = 64;
gauge.set(100);

var lines = [
    "Programming is about understanding with precision. Not about trying until it works.",
    "Learning is my fuel. Stagnation is my enemy.",
    "The first symptom of stagnation is preference.",
	"Being an expert can be an excuse for staying in your comfort zone.",
	"Being a generalist can be an excuse for not learning deeply.",
	"You write your own code more than you read it. Have someone else review it.",
	"The only limits in your life are those that you set yourself.",
	"Risks are where breakthroughs happen. Big shifts take you to new places and create opportunities.",
	"Innovation is a team sport. All the great innovations have come through collaboration and partnerships."
];

var cl1 = 0;
var cl2 = 3;

$(function(){ 

	InitLines();

	setInterval(UpdateLines, 20000);
});

function InitLines()
{
	$("#cool_line").html(lines[cl1]);
	$("#cool_bt").html(lines[cl2]);
}

function UpdateLines()
{
	cl1 = GetNextLine(cl1);
	cl2 = GetNextLine(cl2);
	
	$("#cool_line").fadeOut("slow", function() {
		$("#cool_line").html(lines[cl1]);
		$("#cool_line").fadeIn("slow");		
	})
	$("#cool_bt").fadeOut("slow", function() {
		$("#cool_bt").html(lines[cl2]);
		$("#cool_bt").fadeIn("slow");		
	})
}

function GetNextLine(lineNumber)
{
	var ln = lineNumber + 1;
	if (ln>=lines.length)
	{
		ln = 0;
	}
	return ln;
}