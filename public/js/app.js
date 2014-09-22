var piece_x = 'X';
var piece_o = 'O';
var anim_x = 'fadeIn';
var anim_o = 'fadeIn';
var score_1 = 0;
var score_2 = 0;
var score = 0;
var play_count = 1;
var game_over = false;

// track the turn
var turn = {
    number : 0,
    current_player : function() {
        if (this.number % 2 === 0) {
            return 1;
        }
        else {
            return 2;
        }
    },
    change_turn : function(){
        this.number += 1;
    }
};


// is this cell available
function check_cell(cell) {
    var cell_content = $(cell).html();

    if (cell_content === '') {
        return true;
    }
    else {
        return false;
    }
}

// if cell is empty, cell is marked with player's piece
function change_cell(cell) {
    var cellID = $(cell).attr('id');
    var cellNo   = parseInt(cellID.replace(/[^0-9\.]/g, ''), 10);

    if (turn.current_player() === 1) {
        $(cell).html('<span class="' + anim_x +' animated">'+piece_x+'</span>').addClass('X');
        check_winner('X');
    }
    else {
        $(cell).html('<span class="' + anim_o +' animated">'+piece_o+'</span>').addClass('O');
        check_winner('O');
    }
    $(cell).removeClass('open').addClass('closed');

    turn.change_turn();
    play_count = play_count + 1;
}

// checks for winners
function check_winner(t){ 
    if (check_rows(t) || check_cols(t) || check_diag(t)) {
        game_over = true;
        end_game.winner(t);
    }
    else if (play_count == 9) {
        game_over = true;
        end_game.tie();
    }
    else {
        return false;
    }
}

// what to do when the game ends
var end_game = {
    winner : function(t) {
        $('#board').addClass('game-over');
        score = turn.current_player();
    
        if (turn.current_player() === 1) {
            score_1 = score_1+1;
            score = score_1;
        }
        else {
            score_2 = score_2+1;
            score = score_2;
        }

        $('#player-'+turn.current_player()+' .score-total').text(score);
        $('#player-'+turn.current_player()).addClass('winner');
    },

    tie : function(){
        $('#board').addClass('game-over');
        $('.results').prepend('<h2>It\'s a tie!</h2>');
    }
}; 


function check_rows(t) {
    if ( $('#cell-1').hasClass(t) && $('#cell-2').hasClass(t) && $('#cell-3').hasClass(t) ||
         $('#cell-4').hasClass(t) && $('#cell-5').hasClass(t) && $('#cell-6').hasClass(t) ||
         $('#cell-7').hasClass(t) && $('#cell-8').hasClass(t) && $('#cell-9').hasClass(t) ) {
         return true;
    }
    else { return false; }
}
function check_cols(t) {
    if ( $('#cell-1').hasClass(t) && $('#cell-4').hasClass(t) && $('#cell-7').hasClass(t) ||
         $('#cell-2').hasClass(t) && $('#cell-5').hasClass(t) && $('#cell-8').hasClass(t) ||
         $('#cell-3').hasClass(t) && $('#cell-6').hasClass(t) && $('#cell-9').hasClass(t) ) {
         return true;
    }
    else { return false; }
}
function check_diag(t) {
    if ( $('#cell-1').hasClass(t) && $('#cell-5').hasClass(t) && $('#cell-9').hasClass(t) ||
         $('#cell-3').hasClass(t) && $('#cell-5').hasClass(t) && $('#cell-7').hasClass(t) ) {
         return true;
    }
    else { return false; }
}

$(function() {

    $('#board td').addClass('open');

    $('#board td').on('click', function() {
        // Check if cell is 0 on the board
        if (!game_over) {
            if(check_cell(this)) {
                change_cell(this);
            }
        }

    });

    $('#restart').on('click', function() {
        $('#board td.closed').html('').removeClass().addClass('open');
        $('#board').removeClass('game-over');
        $('.scoreboard').removeClass('winner');
        $('.results h2').remove();
        play_count = 1;
        game_over = false;
    });



    // konami all the things
    $( window ).konami({
        cheat: function() {
            console.log( 'Lyft code activated!' );
            $('html').addClass('lyft');

            $('h1').text('Lyft Tac Toe');

            piece_x = '<img src="img/mustache.png">';
            piece_o = '<img src="img/balloon.png">';
            anim_x = 'rubberBand';
            anim_o = 'fadeInUpBig';

            $('#board td span:contains("X")').html(piece_x);
            $('#board td span:contains("O")').html(piece_o);

            $('#player-1 .score-header').text('Staches');
            $('#player-2 .score-header').text('Balloons');
        }
    });

}); // end ready
/*
 * Konami Code For jQuery Plugin
 * 1.2.1, 23 October 2013
 *
 * Using the Konami code, easily configure and Easter Egg for your page or any element on the page.
 *
 * Copyright 2011 - 2013 Tom McFarlin, http://tommcfarlin.com
 * Released under the MIT License
 */(function(e){"use strict";e.fn.konami=function(t){var n,r,i,s;n=e.extend({},e.fn.konami.defaults,t);return this.each(function(){i=[];e(window).keyup(function(e){s=e.keyCode||e.which;if(n.code.length>i.push(s)){return}if(n.code.length<i.length){i.shift()}if(n.code.toString()!==i.toString()){return}n.cheat()})})};e.fn.konami.defaults={code:[38,38,40,40,37,39,37,39,66,65],cheat:null}})(jQuery)