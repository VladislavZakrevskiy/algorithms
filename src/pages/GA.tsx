import { useEffect, useRef } from 'react'

const GA = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	useEffect(() => {
		let timer = 0

		if (canvasRef.current) {
			const canvas = canvasRef.current
			const ctx = canvas.getContext('2d')!
			canvas.width = window.innerWidth - 40
			canvas.height = window.innerHeight - 40

			class Bot {
				adr = 0
				x = 0
				y = 0
				health = 0
				mineral = 0
				alive = 0
				c_red = 0
				c_green = 0
				c_blue = 0
				direction = 0
				mprev: Bot | null = null
				mnext: Bot | null = null

				mind: number[] = new Array(64) as number[]

				MIND_SIZE = 64

				LV_FREE = 0
				LV_ORGANIC_HOLD = 1
				LV_ORGANIC_SINK = 2
				LV_ALIVE = 3

				constructor() {
					this.health = 5
					this.direction = 2
					this.alive = 3
				}

				step(): void {
					if (this.alive == 0 || this.alive == 1 || this.alive == 2) return

					for (let i = 0; i < 15; i++) {
						const command = this.mind[this.adr]

						if (command == 23) {
							const param = this.botGetParam(this) % 8
							let newdrct = this.direction + param
							if (newdrct >= 8) {
								newdrct = newdrct - 8
							}
							this.direction = newdrct
							this.botIncCommandAddress(this, 2)
						}

						if (command == 24) {
							this.direction = this.botGetParam(this) % 8
							this.botIncCommandAddress(this, 2)
						}

						if (command == 25) {
							this.botEatSun(this)
							this.botIncCommandAddress(this, 1)
							break
						}

						if (command == 26) {
							if (this.isMulti(this) == 0) {
								const drct = this.botGetParam(this) % 8
								this.botIndirectIncCmdAddress(this, this.botMove(this, drct, 0))
							} else {
								this.botIncCommandAddress(this, 2)
							}
							break
						}

						if (command == 27) {
							if (this.isMulti(this) == 0) {
								const drct = this.botGetParam(this) % 8
								this.botIndirectIncCmdAddress(this, this.botMove(this, drct, 1))
							}
							break
						}

						if (command == 28) {
							const drct = this.botGetParam(this) % 8
							this.botIndirectIncCmdAddress(this, this.botEat(this, drct, 0))

							break
						}

						if (command == 29) {
							const drct = this.botGetParam(this) % 8
							this.botIndirectIncCmdAddress(this, this.botEat(this, drct, 1))
							break
						}

						if (command == 30) {
							const drct = this.botGetParam(this) % 8
							this.botIndirectIncCmdAddress(this, this.botSeeBots(this, drct, 0))
						}

						if (command == 31) {
							const drct = this.botGetParam(this) % 8
							this.botIndirectIncCmdAddress(this, this.botSeeBots(this, drct, 1))
						}

						if (command == 32 || command == 42) {
							const drct = this.botGetParam(this) % 8
							this.botIndirectIncCmdAddress(this, this.botCare(this, drct, 0))
						}

						if (command == 33 || command == 50) {
							const drct = this.botGetParam(this) % 8
							this.botIndirectIncCmdAddress(this, this.botCare(this, drct, 1))
						}

						if (command == 34 || command == 51) {
							const drct = this.botGetParam(this) % 8
							this.botIndirectIncCmdAddress(this, this.botGive(this, drct, 0))
						}

						if (command == 35 || command == 52) {
							const drct = this.botGetParam(this) % 8
							this.botIndirectIncCmdAddress(this, this.botGive(this, drct, 1))
						}

						if (command == 36) {
							if (Math.random() < 0.5) {
								this.direction = 3
							} else {
								this.direction = 7
							}
							this.botIncCommandAddress(this, 1)
						}

						if (command == 37) {
							const param = (this.botGetParam(this) * game.height) / this.MIND_SIZE

							if (this.y < param) {
								this.botIndirectIncCmdAddress(this, 2)
							} else {
								this.botIndirectIncCmdAddress(this, 3)
							}
						}

						if (command == 38) {
							const param = (this.botGetParam(this) * 1000) / this.MIND_SIZE

							if (this.health < param) {
								this.botIndirectIncCmdAddress(this, 2)
							} else {
								this.botIndirectIncCmdAddress(this, 3)
							}
						}

						if (command == 39) {
							const param = (this.botGetParam(this) * 1000) / this.MIND_SIZE
							if (this.mineral < param) {
								this.botIndirectIncCmdAddress(this, 2)
							} else {
								this.botIndirectIncCmdAddress(this, 3)
							}
						}

						if (command == 40) {
							const a = this.isMulti(this)
							if (a == 3) {
								this.botDouble(this)
							} else {
								this.botMulti(this)
							}
							this.botIncCommandAddress(this, 1)
							break
						}

						if (command == 41) {
							const a = this.isMulti(this)
							if (a == 0 || a == 3) {
								this.botDouble(this)
							} else {
								this.botMulti(this)
							}
							this.botIncCommandAddress(this, 1)
							break
						}

						if (command == 43) {
							this.botIndirectIncCmdAddress(this, this.fullAroud(this))
						}

						if (command == 44) {
							this.botIndirectIncCmdAddress(this, this.isHealthGrow(this))
						}

						if (command == 45) {
							if (this.y > game.height / 2) {
								this.botIndirectIncCmdAddress(this, 1)
							} else {
								this.botIndirectIncCmdAddress(this, 2)
							}
						}

						if (command == 46) {
							const mu = this.isMulti(this)
							if (mu == 0) {
								this.botIndirectIncCmdAddress(this, 1)
							} else {
								if (mu == 3) {
									this.botIndirectIncCmdAddress(this, 3)
								} else {
									this.botIndirectIncCmdAddress(this, 2)
								}
							}
						}

						if (command == 47) {
							this.botMineral2Energy(this)
							this.botIncCommandAddress(this, 1)
							break
						}

						if (command == 48) {
							let ma = Math.floor(Math.random() * 64)
							let mc = Math.floor(Math.random() * 64)
							this.mind[ma] = mc

							ma = Math.floor(Math.random() * 64)
							mc = Math.floor(Math.random() * 64)
							this.mind[ma] = mc
							this.botIncCommandAddress(this, 1)
							break
						}

						if (command == 49) {
							this.botGenAttack(this)
							this.botIncCommandAddress(this, 1)
							break
						}
					}

					const command = this.mind[this.adr]
					if ((command >= 0 && command <= 22) || (command >= 53 && command <= 63)) {
						this.botIncCommandAddress(this, command)
					}

					if (this.alive == this.LV_ALIVE) {
						const a = this.isMulti(this)

						if (a == 3) {
							const pb = this.mprev
							const nb = this.mnext

							let m = this.mineral + nb!.mineral + pb!.mineral

							m = m / 3
							this.mineral = m
							nb!.mineral = m
							pb!.mineral = m

							const apb = this.isMulti(pb!)
							const anb = this.isMulti(nb!)
							if (anb == 3 && apb == 3) {
								let h = this.health + nb!.health + pb!.health
								h = h / 3
								this.health = h
								nb!.health = h
								pb!.health = h
							}
						}

						if (a == 1) {
							const pb = this.mprev
							const apb = this.isMulti(pb!)
							if (apb == 3) {
								let h = this.health + pb!.health
								h = h / 4
								this.health = h * 3
								pb!.health = h
							}
						}

						if (a == 2) {
							const nb = this.mnext
							const anb = this.isMulti(nb!)
							if (anb == 3) {
								let h = this.health + nb!.health
								h = h / 4
								this.health = h * 3
								nb!.health = h
							}
						}

						if (this.health > 999) {
							if (a == 1 || a == 2) {
								this.botMulti(this)
							} else {
								this.botDouble(this)
							}
						}
						this.health = this.health - 3
						if (this.health < 1) {
							this.bot2Organic(this)
							return
						}

						if (this.y > game.height / 2) {
							this.mineral = this.mineral + 1
							if (this.y > (game.height / 6) * 4) {
								this.mineral = this.mineral + 1
							}
							if (this.y > (game.height / 6) * 5) {
								this.mineral = this.mineral + 1
							}
							if (this.mineral > 999) {
								this.mineral = 999
							}
						}
					}
				}

				public xFromVektorR(bot: Bot, n: number): number {
					let xt = bot.x
					n = n + bot.direction
					if (n >= 8) {
						n = n - 8
					}
					if (n == 0 || n == 6 || n == 7) {
						xt = xt - 1
						if (xt == -1) {
							xt = game.width - 1
						}
					} else if (n == 2 || n == 3 || n == 4) {
						xt = xt + 1
						if (xt == game.width) {
							xt = 0
						}
					}
					return xt
				}

				public xFromVektorA(bot: Bot, n: number): number {
					let xt = bot.x
					if (n == 0 || n == 6 || n == 7) {
						xt = xt - 1
						if (xt == -1) {
							xt = game.width - 1
						}
					} else if (n == 2 || n == 3 || n == 4) {
						xt = xt + 1
						if (xt == game.width) {
							xt = 0
						}
					}
					return xt
				}

				public yFromVektorR(bot: Bot, n: number): number {
					let yt = bot.y
					n = n + bot.direction
					if (n >= 8) {
						n = n - 8
					}
					if (n == 0 || n == 1 || n == 2) {
						yt = yt - 1
					} else if (n == 4 || n == 5 || n == 6) {
						yt = yt + 1
					}
					return yt
				}

				public yFromVektorA(bot: Bot, n: number): number {
					let yt = bot.y
					if (n == 0 || n == 1 || n == 2) {
						yt = yt - 1
					} else if (n == 4 || n == 5 || n == 6) {
						yt = yt + 1
					}
					return yt
				}

				public fullAroud(bot: Bot): number {
					for (let i = 0; i < 8; i++) {
						const xt = this.xFromVektorR(bot, i)
						const yt = this.yFromVektorR(bot, i)
						if (yt >= 0 && yt < game.height) {
							if (game.matrix[xt][yt] == null) {
								return 2
							}
						}
					}
					return 1
				}

				public findEmptyDirection(bot: Bot): number {
					for (let i = 0; i < 8; i++) {
						const xt = this.xFromVektorR(bot, i)
						const yt = this.yFromVektorR(bot, i)
						if (yt >= 0 && yt < game.height) {
							if (game.matrix[xt][yt] == null) {
								return i
							}
						}
					}

					return 8
				}

				public botGetParam(bot: Bot): number {
					let paramadr = bot.adr + 1
					if (paramadr >= this.MIND_SIZE) {
						paramadr = paramadr - this.MIND_SIZE
					}
					return bot.mind[paramadr]
				}

				public botIncCommandAddress(bot: Bot, a: number) {
					let paramadr = bot.adr + a
					if (paramadr >= this.MIND_SIZE) {
						paramadr = paramadr - this.MIND_SIZE
					}
					bot.adr = paramadr
				}

				public botIndirectIncCmdAddress(bot: Bot, a: number) {
					let paramadr = bot.adr + a
					if (paramadr >= this.MIND_SIZE) {
						paramadr = paramadr - this.MIND_SIZE
					}
					const bias = bot.mind[paramadr]
					this.botIncCommandAddress(bot, bias)
				}

				public bot2Organic(bot: Bot) {
					bot.alive = this.LV_ORGANIC_HOLD
					const pbot = bot.mprev
					const nbot = bot.mnext
					if (pbot != null) {
						pbot.mnext = null
					}
					if (nbot != null) {
						nbot.mprev = null
					}
					bot.mprev = null
					bot.mnext = null
				}

				public isMulti(bot: Bot): number {
					let a = 0
					if (bot.mprev != null) {
						a = 1
					}
					if (bot.mnext != null) {
						a = a + 2
					}
					return a
				}

				public moveBot(bot: Bot, xt: number, yt: number) {
					game.matrix[xt][yt] = bot
					game.matrix[bot.x][bot.y] = null
					bot.x = xt
					bot.y = yt
				}

				public deleteBot(bot: Bot) {
					const pbot = bot.mprev
					const nbot = bot.mnext
					if (pbot != null) {
						pbot.mnext = null
					}
					if (nbot != null) {
						nbot.mprev = null
					}
					bot.mprev = null
					bot.mnext = null
					game.matrix[bot.x][bot.y] = null
				}

				public botEatSun(bot: Bot) {
					let t
					if (bot.mineral < 100) {
						t = 0
					} else if (bot.mineral < 400) {
						t = 1
					} else {
						t = 2
					}
					let a = 0
					if (bot.mprev != null) {
						a = a + 4
					}
					if (bot.mnext != null) {
						a = a + 4
					}
					const hlt = a + 1 * (11 - (15 * bot.y) / game.height + t)

					if (hlt > 0) {
						bot.health = bot.health + hlt
						this.goGreen(bot, hlt)
					}
				}

				public botMineral2Energy(bot: Bot) {
					if (bot.mineral > 100) {
						bot.mineral = bot.mineral - 100
						bot.health = bot.health + 400
						this.goBlue(bot, 100)
					} else {
						this.goBlue(bot, bot.mineral)
						bot.health = bot.health + 4 * bot.mineral
						bot.mineral = 0
					}
				}

				public botMove(bot: Bot, direction: number, ra: number) {
					let xt
					let yt
					if (ra == 0) {
						xt = this.xFromVektorR(bot, direction)
						yt = this.yFromVektorR(bot, direction)
					} else {
						xt = this.xFromVektorA(bot, direction)
						yt = this.yFromVektorA(bot, direction)
					}
					if (yt < 0 || yt >= game.height) {
						return 3
					}
					if (game.matrix[xt][yt] == null) {
						this.moveBot(bot, xt, yt)
						return 2
					}

					if (game.matrix[xt][yt]!.alive <= this.LV_ORGANIC_SINK) {
						return 4
					}
					if (this.isRelative(bot, game.matrix[xt][yt]!) == 1) {
						return 6
					}
					return 5
				}

				public botEat(bot: Bot, direction: number, ra: number) {
					bot.health = bot.health - 4
					let xt
					let yt
					if (ra == 0) {
						xt = this.xFromVektorR(bot, direction)
						yt = this.yFromVektorR(bot, direction)
					} else {
						xt = this.xFromVektorA(bot, direction)
						yt = this.yFromVektorA(bot, direction)
					}
					if (yt < 0 || yt >= game.height) {
						return 3
					}
					if (game.matrix[xt][yt] == null) {
						return 2
					} else if (game.matrix[xt][yt]!.alive <= this.LV_ORGANIC_SINK) {
						this.deleteBot(game.matrix[xt][yt] as Bot)
						bot.health = bot.health + 100
						this.goRed(this, 100)
						return 4
					}

					const min0 = bot.mineral
					let min1 = game.matrix[xt][yt]?.mineral
					const hl = game.matrix[xt][yt]?.health

					if (min0 >= min1!) {
						bot.mineral = min0 - min1!

						this.deleteBot(game.matrix[xt][yt]!)
						const cl = 100 + hl! / 2
						bot.health = bot.health + cl
						this.goRed(this, cl)
						return 5
					}

					bot.mineral = 0
					min1 = min1! - min0
					game.matrix[xt][yt]!.mineral = min1 - min0

					if (bot.health >= 2 * min1) {
						this.deleteBot(game.matrix[xt][yt]!)
						let cl = 100 + hl! / 2 - 2 * min1
						bot.health = bot.health + cl
						if (cl < 0) {
							cl = 0
						}

						this.goRed(this, cl)
						return 5
					}

					game.matrix[xt][yt]!.mineral = min1 - bot.health / 2
					bot.health = 0
					return 5
				}

				public botSeeBots(bot: Bot, direction: number, ra: number) {
					let xt
					let yt
					if (ra == 0) {
						xt = this.xFromVektorR(bot, direction)
						yt = this.yFromVektorR(bot, direction)
					} else {
						xt = this.xFromVektorA(bot, direction)
						yt = this.yFromVektorA(bot, direction)
					}
					if (yt < 0 || yt >= game.height) {
						return 3
					} else if (game.matrix[xt][yt] == null) {
						return 2
					} else if (game.matrix[xt][yt]!.alive <= this.LV_ORGANIC_SINK) {
						return 4
					} else if (this.isRelative(bot, game.matrix[xt][yt]!) == 1) {
						return 6
					} else {
						return 5
					}
				}

				public botGenAttack(bot: Bot) {
					const xt = this.xFromVektorR(bot, 0)
					const yt = this.yFromVektorR(bot, 0)
					if (yt >= 0 && yt < game.height && game.matrix[xt][yt] != null) {
						if (game.matrix[xt][yt]!.alive == this.LV_ALIVE) {
							bot.health = bot.health - 10
							if (bot.health > 0) {
								const ma = Math.floor(Math.random() * 64)
								const mc = Math.floor(Math.random() * 64)
								game.matrix[xt][yt]!.mind[ma] = mc
							}
						}
					}
				}

				public botCare(bot: Bot, direction: number, ra: number) {
					let xt
					let yt
					if (ra == 0) {
						xt = this.xFromVektorR(bot, direction)
						yt = this.yFromVektorR(bot, direction)
					} else {
						xt = this.xFromVektorA(bot, direction)
						yt = this.yFromVektorA(bot, direction)
					}
					if (yt < 0 || yt >= game.height) {
						return 3
					} else if (game.matrix[xt][yt] == null) {
						return 2
					} else if (game.matrix[xt][yt]!.alive <= this.LV_ORGANIC_SINK) {
						return 4
					}

					const hlt0 = bot.health
					const hlt1 = game.matrix[xt][yt]!.health
					const min0 = bot.mineral
					const min1 = game.matrix[xt][yt]!.mineral
					if (hlt0 > hlt1) {
						const hlt = (hlt0 - hlt1) / 2
						bot.health = bot.health - hlt
						game.matrix[xt][yt]!.health = game.matrix[xt][yt]!.health + hlt
					}
					if (min0 > min1) {
						const min = (min0 - min1) / 2
						bot.mineral = bot.mineral - min
						game.matrix[xt][yt]!.mineral = game.matrix[xt][yt]!.mineral + min
					}
					return 5
				}

				public botGive(bot: Bot, direction: number, ra: number) {
					let xt
					let yt
					if (ra == 0) {
						xt = this.xFromVektorR(bot, direction)
						yt = this.yFromVektorR(bot, direction)
					} else {
						xt = this.xFromVektorA(bot, direction)
						yt = this.yFromVektorA(bot, direction)
					}
					if (yt < 0 || yt >= game.height) {
						return 3
					} else if (game.matrix[xt][yt] == null) {
						return 2
					} else if (game.matrix[xt][yt]!.alive <= this.LV_ORGANIC_SINK) {
						return 4
					}

					const hlt0 = bot.health
					const hlt = hlt0 / 4
					bot.health = hlt0 - hlt
					game.matrix[xt][yt]!.health = game.matrix[xt][yt]!.health + hlt

					const min0 = bot.mineral
					if (min0 > 3) {
						const min = min0 / 4
						bot.mineral = min0 - min
						game.matrix[xt][yt]!.mineral = game.matrix[xt][yt]!.mineral + min
						if (game.matrix[xt][yt]!.mineral > 999) {
							game.matrix[xt][yt]!.mineral = 999
						}
					}
					return 5
				}

				public botDouble(bot: Bot) {
					bot.health = bot.health - 150
					if (bot.health <= 0) {
						return
					}

					const n = this.findEmptyDirection(bot)
					if (n == 8) {
						bot.health = 0
						return
					}

					const newbot = new Bot()

					const xt = this.xFromVektorR(bot, n)
					const yt = this.yFromVektorR(bot, n)

					for (let i = 0; i < this.MIND_SIZE; i++) {
						newbot.mind[i] = bot.mind[i]
					}
					if (Math.random() < 0.25) {
						const ma = Math.floor(Math.random() * 64)
						const mc = Math.floor(Math.random() * 64)
						newbot.mind[ma] = mc
					}

					newbot.adr = 0
					newbot.x = xt
					newbot.y = yt

					newbot.health = bot.health / 2
					bot.health = bot.health / 2
					newbot.mineral = bot.mineral / 2
					bot.mineral = bot.mineral / 2

					newbot.alive = 3

					newbot.c_red = bot.c_red
					newbot.c_green = bot.c_green
					newbot.c_blue = bot.c_blue

					newbot.direction = Math.floor(Math.random() * 8)

					game.matrix[xt][yt] = newbot
				}

				private botMulti(bot: Bot) {
					const pbot = bot.mprev
					const nbot = bot.mnext

					if (pbot != null && nbot != null) {
						return
					}

					bot.health = bot.health - 150
					if (bot.health <= 0) {
						return
					}
					const n = this.findEmptyDirection(bot)

					if (n == 8) {
						bot.health = 0
						return
					}
					const newbot = new Bot()

					const xt = this.xFromVektorR(bot, n)
					const yt = this.yFromVektorR(bot, n)

					for (let i = 0; i < this.MIND_SIZE; i++) {
						newbot.mind[i] = newbot.mind[i]
					}
					if (Math.random() < 0.25) {
						const ma = Math.floor(Math.random() * 64)
						const mc = Math.floor(Math.random() * 64)
						newbot.mind[ma] = mc
					}

					newbot.adr = 0
					newbot.x = xt
					newbot.y = yt

					newbot.health = bot.health / 2
					bot.health = bot.health / 2
					newbot.mineral = bot.mineral / 2
					bot.mineral = bot.mineral / 2

					newbot.alive = 3

					newbot.c_red = bot.c_red
					newbot.c_green = bot.c_green
					newbot.c_blue = bot.c_blue

					newbot.direction = Math.floor(Math.random() * 8)

					game.matrix[xt][yt] = newbot

					if (nbot == null) {
						bot.mnext = newbot
						newbot.mprev = bot
						newbot.mnext = null
					} else {
						bot.mprev = newbot
						newbot.mnext = bot
						newbot.mprev = null
					}
				}

				public isHealthGrow(bot: Bot) {
					let t
					if (bot.mineral < 100) {
						t = 0
					} else {
						if (bot.mineral < 400) {
							t = 1
						} else {
							t = 2
						}
					}
					const hlt = 10 - (15 * bot.y) / game.height + t
					if (hlt >= 3) {
						return 1
					} else {
						return 2
					}
				}

				public isRelative(bot0: Bot, bot1: Bot) {
					if (bot1.alive != this.LV_ALIVE) {
						return 0
					}
					let dif = 0
					for (let i = 0; i < this.MIND_SIZE; i++) {
						if (bot0.mind[i] != bot1.mind[i]) {
							dif = dif + 1
							if (dif == 2) {
								return 0
							}
						}
					}
					return 1
				}

				public goGreen(bot: Bot, num: number) {
					bot.c_green = bot.c_green + num
					if (bot.c_green + num > 255) {
						bot.c_green = 255
					}
					const nm = num / 2

					bot.c_red = bot.c_red - nm
					if (bot.c_red < 0) {
						bot.c_blue = bot.c_blue + bot.c_red
					}

					bot.c_blue = bot.c_blue - nm
					if (bot.c_blue < 0) {
						bot.c_red = bot.c_red + bot.c_blue
					}
					if (bot.c_red < 0) {
						bot.c_red = 0
					}
					if (bot.c_blue < 0) {
						bot.c_blue = 0
					}
				}

				public goBlue(bot: Bot, num: number) {
					bot.c_blue = bot.c_blue + num
					if (bot.c_blue > 255) {
						bot.c_blue = 255
					}
					const nm = num / 2

					bot.c_green = bot.c_green - nm
					if (bot.c_green < 0) {
						bot.c_red = bot.c_red + bot.c_green
					}

					bot.c_red = bot.c_red - nm
					if (bot.c_red < 0) {
						bot.c_green = bot.c_green + bot.c_red
					}
					if (bot.c_red < 0) {
						bot.c_red = 0
					}
					if (bot.c_green < 0) {
						bot.c_green = 0
					}
				}

				public goRed(bot: Bot, num: number) {
					bot.c_red = bot.c_red + num
					if (bot.c_red > 255) {
						bot.c_red = 255
					}
					const nm = num / 2

					bot.c_green = bot.c_green - nm
					if (bot.c_green < 0) {
						bot.c_blue = bot.c_blue + bot.c_green
					}

					bot.c_blue = bot.c_blue - nm
					if (bot.c_blue < 0) {
						bot.c_green = bot.c_green + bot.c_blue
					}
					if (bot.c_blue < 0) {
						bot.c_blue = 0
					}
					if (bot.c_green < 0) {
						bot.c_green = 0
					}
				}
			}

			class World {
				width
				height
				matrix: Bot[][] | null[][]
				generation = 0
				population = 0
				organic = 0

				constructor(width: number, height: number) {
					this.width = width
					this.height = height
					this.matrix = []

					for (let x = 0; x < width; x++) {
						const arr = []
						for (let y = 0; y < height; y++) {
							arr.push(null)
						}
						this.matrix.push(arr)
					}

					const bot = new Bot()
					bot.adr = 0
					bot.x = this.width / 2
					bot.y = this.height / 2
					bot.health = 990
					bot.mineral = 0
					bot.alive = 3
					bot.c_red = 170
					bot.c_blue = 170
					bot.c_green = 170
					bot.direction = 5
					bot.mprev = null
					bot.mnext = null
					for (let i = 0; i < 64; i++) {
						bot.mind[i] = 25
					}

					this.matrix[bot.x][bot.y] = bot
					console.log(this.matrix)
					return
				}

				paint() {
					ctx.fillRect(
						49,
						49,
						this.width * (canvas.width / this.width) + 1,
						this.height * (canvas.height / this.height) + 1
					)
					this.population = 0
					this.organic = 0
					for (let y = 0; y < this.height; y++) {
						for (let x = 0; x < this.width; x++) {
							const xt = x * (canvas.width / this.width)
							const yt = y * (canvas.height / this.height)
							if (this.matrix[x][y] == null) {
								ctx.fillStyle = '#fff'
								ctx.fillRect(50 + xt, 50 + yt, 5, 5)
							} else if (this.matrix[x][y]!.alive == 1 || this.matrix[x][y]!.alive == 2) {
								ctx.fillStyle = 'rgb(200,200,200)'
								ctx.fillRect(50 + xt, 50 + yt, 5, 5)
								this.organic = this.organic + 1
							} else if (this.matrix[x][y]!.alive == 3) {
								ctx.fillStyle = '#000'
								ctx.fillRect(50 + xt, 50 + yt, 5, 5)
								let green = Math.floor(
									this.matrix[x][y]!.c_green -
										(this.matrix[x][y]!.c_green * this.matrix[x][y]!.health) / 2000
								)
								if (green < 0) green = 0
								if (green > 255) green = 255
								const blue = Math.floor(
									this.matrix[x][y]!.c_blue * 0.8 -
										(this.matrix[x][y]!.c_blue * this.matrix[x][y]!.mineral) / 2000
								)
								ctx.fillStyle = `rgb(${this.matrix[x][y]!.c_red}, ${green}, ${blue})`
								ctx.fillRect(50 + xt + 1, 50 + yt + 1, 6, 6)
								this.population = this.population + 1
							}
						}

						ctx.fillStyle = '#fff'
						ctx.fillRect(50, 30, 140, 16)
						ctx.fillStyle = '#000'
						ctx.fillText('Generation: ' + String(this.generation), 54, 44)

						ctx.fillStyle = '#fff'
						ctx.fillRect(200, 30, 140, 16)
						ctx.fillStyle = '#000'
						ctx.fillText('Population: ' + String(this.population), 204, 44)

						ctx.fillStyle = '#fff'
						ctx.fillRect(350, 30, 140, 16)
						ctx.fillStyle = '#000'
						ctx.fillText('Organic: ' + String(this.organic), 354, 44)
					}
				}

				run() {
					for (let yw = 0; yw < this.height; yw++) {
						for (let xw = 0; xw < this.width; xw++) {
							if (this.matrix[xw][yw] != null) {
								this.matrix[xw][yw]!.step()
							}
						}
					}
					this.generation += 1
				}

				generateAdam() {
					const bot = new Bot()
					bot.adr = 0
					bot.x = this.width / 2
					bot.y = this.height / 2
					bot.health = 1000
					bot.mineral = 0
					bot.alive = 3
					bot.c_red = 170
					bot.c_blue = 170
					bot.c_green = 170
					bot.direction = 5
					bot.mprev = null
					bot.mnext = null
					for (let i = 0; i < 64; i++) {
						bot.mind[i] = 25
					}

					this.matrix[bot.x][bot.y] = bot
					console.log(this.matrix)
					return
				}
			}

			const game = new World(200, 100)
			game.generateAdam()

			const animate = () => {
				game.run()
				game.paint()
				timer = requestAnimationFrame(animate)
			}

			document.addEventListener('keyup', (ev) => {
				if (ev.code === 'Space') {
					console.log(game.matrix)
				}
			})

			animate()
		}

		return () => cancelAnimationFrame(timer)
	}, [canvasRef])

	return <canvas style={{margin: 20}} ref={canvasRef} />
}

export default GA
