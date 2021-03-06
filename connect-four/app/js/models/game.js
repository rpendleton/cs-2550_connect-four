define('models/game', ['lib', 'model'], function($, Model) {
	'use strict';

	var PLAYER = {
		RED: 'red',
		BLACK: 'black'
	};

	var GameModel = Model.extend({
		initialize: function() {
			this.width = 7;
			this.height = 6;
			this.restart();
		},

		loadSampleBoard: function() {
			var self = this;

			$.ajax({
				url: 'json/sample.json',
				method: 'GET',

				success: function(xhr, data) {
					self.loadBoard(data);
				}
			});
		},

		loadBoard: function(state) {
			if(state.board.length !== this.height || state.board[0].length !== this.width) {
				throw 'You can only restore a game that matches the dimensions used during initialization';
			}

			this.turn = state.turn;
			this.board = state.board;
			this.emit('loadBoard', state);
		},

		restart: function() {
			this.turn = PLAYER.RED;
			this.board = [];
			this.gameWon = false;

			for(var y = 0; y < this.height; y++) {
				this.board[y] = [];

				for(var x = 0; x < this.width; x++) {
					this.board[y][x] = null;
				}
			}

			this.emit('restart', {
				turn: this.turn,
				board: this.board
			});
		},

		setCell: function(cell, player) {
			if(cell.y === (this.height - 1) || this.board[cell.y + 1][cell.x] !== null) {
				this.board[cell.y][cell.x] = player;
				this.emit('setCell', cell, player);

				return true;
			}
		},

		setTurn: function(turn) {
			this.turn = turn;
			this.emit('setTurn', turn);
		},

		makeMove: function(cell) {
			var player = this.turn;

			if(this.gameWon) {
				return false;
			}
			else if(this.setCell(cell, player)) {
				this.setTurn(player === PLAYER.RED ? PLAYER.BLACK : PLAYER.RED);
				this.emit('madeMove', cell, player);

				var winningCells = this.checkForWinner(cell, player);

				if(winningCells) {
					this.gameWon = true;
					this.emit('winnerFound', winningCells, player);
				}

				return true;
			}
			else {
				return false;
			}
		},

		checkForWinner: function(cell, player) {
			var considerCell = function(y, x) {
				if(cells.length === 4) {
					return false;
				}

				var cell = this.board[y][x];

				if(cell === player) {
					cells.push({
						x: x,
						y: y
					});

					if(cells.length === 4) {
						return false;
					}
				}
				else {
					return false;
				}

				return true;
			};

			var x, y;
			var cells = [];
			var max = 0;

			// top down
			for(y = cell.y; y < this.height; y++) {
				if(!considerCell.call(this, y, cell.x)) {
					break;
				}
			}

			max = cells.length;

			// horizontal
			if(cells.length !== 4) {
				cells = [];

				// center to left
				for(x = cell.x; x >= 0; x--) {
					if(!considerCell.call(this, cell.y, x)) {
						break;
					}
				}

				// center+{1,0} to right
				for(x = cell.x + 1; x < this.width; x++) {
					if(!considerCell.call(this, cell.y, x)) {
						break;
					}
				}

				max = Math.max(max, cells.length);
			}

			// ascending diagonal
			if(cells.length !== 4) {
				cells = [];

				// center to top right
				for(x = cell.x, y = cell.y; x < this.width, y >= 0; x++, y--) {
					if(!considerCell.call(this, y, x)) {
						break;
					}
				}

				// center+{-1,1} center to bottom left
				for(x = cell.x - 1, y = cell.y + 1; x >= 0, y < this.height; x--, y++) {
					if(!considerCell.call(this, y, x)) {
						break;
					}
				}

				max = Math.max(max, cells.length);
			}

			// descending diagonal
			if(cells.length !== 4) {
				cells = [];

				// center to top left
				for(x = cell.x, y = cell.y; x >= 0, y >= 0; x--, y--) {
					if(!considerCell.call(this, y, x)) {
						break;
					}
				}

				// center+{1,1} center to bottom right
				for(x = cell.x + 1, y = cell.y + 1; x < this.width, y < this.height; x++, y++) {
					if(!considerCell.call(this, y, x)) {
						break;
					}
				}

				max = Math.max(max, cells.length);
			}

			if(max === 4) {
				return cells;
			}
			else {
				return false;
			}
		}
	});

	GameModel.PLAYER = PLAYER;

	return GameModel;
});
