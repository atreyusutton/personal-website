function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

class ScreenEffect {
	constructor(parent, options) {
		this.parent = parent;
		if ( typeof parent === "string" ) {
			this.parent = document.querySelector(parent);
		}
		
		this.config = Object.assign({}, {
			//
		}, options)
		
		this.effects = {};
		
		this.events = {
			resize: this.onResize.bind(this)
		};
		
		window.addEventListener("resize", this.events.resize, false);
		
		this.render();
	}
	
	render() {
		
		const container = document.createElement("div");
		container.classList.add("screen-container");
		
		const wrapper1 = document.createElement("div");
		wrapper1.classList.add("screen-wrapper");
		
		const wrapper2 = document.createElement("div");
		wrapper2.classList.add("screen-wrapper");	
		
		const wrapper3 = document.createElement("div");
		wrapper3.classList.add("screen-wrapper");			
		
		wrapper1.appendChild(wrapper2);
		wrapper2.appendChild(wrapper3);
		
		container.appendChild(wrapper1);
		
		this.parent.parentNode.insertBefore(container, this.parent);
		wrapper3.appendChild(this.parent);
		
		this.nodes = { container, wrapper1, wrapper2, wrapper3 };
		
		this.onResize();
	}
	
	onResize(e) {
		this.rect = this.parent.getBoundingClientRect();
		
		if ( this.effects.vcr && !!this.effects.vcr.enabled ) {
			this.generateVCRNoise();
		}
	}
	
	add(type, options) {
		
		const config = Object.assign({}, {
			fps: 30,
			blur: 1
		}, options);
		
		if ( Array.isArray(type) ) {
			for ( const t of type ) {
				this.add(t);
			}
			
			return this;
		}
		
		const that = this;
		
		if ( type === "snow" ) {
			const canvas = document.createElement("canvas");
			const ctx = canvas.getContext("2d");
			canvas.classList.add(type);
			canvas.width = this.rect.width / 2;
			canvas.height = this.rect.height / 2;
			
			this.nodes.wrapper2.appendChild(canvas);
			
			animate();
			// that.generateSnow(ctx);
			
			function animate() {
				that.generateSnow(ctx);
				that.snowframe = requestAnimationFrame(animate);
			}
			
			this.effects[type] = {
				wrapper: this.nodes.wrapper2,
				node: canvas,
				enabled: true,
				config
			};
			
			return this;
		}
		
		if ( type === "roll" ) {
			return this.enableRoll();
		}
		
		if ( type === "vcr" ) {
			const canvas = document.createElement("canvas");
			canvas.classList.add(type);
			this.nodes.wrapper2.appendChild(canvas);
			
			canvas.width = this.rect.width;
			canvas.height = this.rect.height;
			
			this.effects[type] = {
				wrapper: this.nodes.wrapper2,
				node: canvas,
				ctx: canvas.getContext("2d"),
				enabled: true,
				config
			};			
			
			this.generateVCRNoise();
			
			return this;
		}
		
		let node = false;
		let wrapper = this.nodes.wrapper2;
		
		switch(type) {
			case "wobblex":
			case "wobbley":
				wrapper.classList.add(type);
				break;
			case "scanlines":
				node = document.createElement("div");
				node.classList.add(type);
				wrapper.appendChild(node);
				break;
			case "vignette":
				wrapper = this.nodes.container;
				node = document.createElement("div");
				node.classList.add(type);
				wrapper.appendChild(node);
				break;
			case "image":
				wrapper = this.parent;
				node = document.createElement('img');
				node.classList.add(type);

				node.src = config.src;

				wrapper.appendChild(node);
				break;				
			case "video":
				wrapper = this.parent;
				node = document.createElement('video');
				node.classList.add(type);

				node.src = config.src;
				node.crossOrigin = 'anonymous';
				node.autoplay = true;
				node.muted = true;
				node.loop = true;
				wrapper.appendChild(node);
				break;
		}

		this.effects[type] = {
			wrapper,
			node,
			enabled: true,
			config
		};
		
		return this;
	}
	
	remove(type) {

		const obj = this.effects[type];
		if ( type in this.effects && !!obj.enabled ) {
			obj.enabled = false;
			
			if ( type === "roll" && obj.original ) {
				this.parent.appendChild(obj.original);
			}			
			
			if ( type === "vcr" ) {
				clearInterval(this.vcrInterval);
			}
			
			if ( type === "snow" ) {
				cancelAnimationFrame(this.snowframe);
			}			
			
			if ( obj.node ) {
				obj.wrapper.removeChild(obj.node);
			} else {
				obj.wrapper.classList.remove(type);
			}
		}
		
		return this;
	}
	
	enableRoll() {
		const el = this.parent.firstElementChild;
		
		if ( el ) {
			const div = document.createElement("div");
			div.classList.add("roller");
			
			this.parent.appendChild(div);
			div.appendChild(el);
			div.appendChild(el.cloneNode(true));
			
			// if ( this.effects.vcr.enabled ) {
			// 	div.appendChild(this.effects.vcr.node);
			// }
			
			this.effects.roll = {
				enabled: true,
				wrapper: this.parent,
				node: div,
				original: el
			};
		}
	}
	
	generateVCRNoise() {
		
		
		const canvas = this.effects.vcr.node;
		const config = this.effects.vcr.config;
		const div = this.effects.vcr.node;
		
		if ( config.fps >= 60 ) {
			cancelAnimationFrame(this.vcrInterval);
			const animate = () => {
				this.renderTrackingNoise();
				this.vcrInterval = requestAnimationFrame(animate);
			};
			
			animate();
		} else {
			clearInterval(this.vcrInterval);
			this.vcrInterval = setInterval(() => {
				this.renderTrackingNoise();
			}, 1000 / config.fps);
		}
	}
	
	// Generate CRT noise
	generateSnow(ctx) {

		var w = ctx.canvas.width,
			h = ctx.canvas.height,
			d = ctx.createImageData(w, h),
			b = new Uint32Array(d.data.buffer),
			len = b.length;

		for (var i = 0; i < len; i++) {
			b[i] = ((255 * Math.random()) | 0) << 24;
		}

		ctx.putImageData(d, 0, 0);
	}
	
	renderTrackingNoise(radius = 2, xmax, ymax) {
		
		const canvas = this.effects.vcr.node;
		const ctx = this.effects.vcr.ctx;
		const config = this.effects.vcr.config;
		let posy1 = config.miny || 0;
		let posy2 = config.maxy || canvas.height;
		let posy3 = config.miny2 || 0;
		const num = config.num || 20;
		
		if ( xmax === undefined ) {
			xmax = canvas.width;
		}
		
		if ( ymax === undefined ) {
			ymax = canvas.height;
		}			
		
		canvas.style.filter = `blur(${config.blur}px)`;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillStyle = `#fff`;

		ctx.beginPath();
		for (var i = 0; i <= num; i++) {
			var x = Math.random(i) * xmax;
			var y1 = getRandomInt(posy1+=3, posy2);
			var y2 = getRandomInt(0, posy3-=3);
			ctx.fillRect(x, y1, radius, radius);
			ctx.fillRect(x, y2, radius, radius);
			ctx.fill();

			this.renderTail(ctx, x, y1, radius);
			this.renderTail(ctx, x, y2, radius);
		}
		ctx.closePath();
	}

	renderTail(ctx, x, y, radius) {
		const n = getRandomInt(1, 50);

		const dirs = [1, -1];
		let rd = radius;
		const dir = dirs[Math.floor(Math.random() * dirs.length)];
		for (let i = 0; i < n; i++) {
			const step = 0.01;
			let r = getRandomInt((rd -= step), radius);
			let dx = getRandomInt(1, 4);

			radius -= 0.1;

			dx *= dir;

			ctx.fillRect((x += dx), y, r, r);
			ctx.fill();
		}
	}	

}

const screen = new ScreenEffect("#screen", {

});

const gui = new dat.GUI();

const config = {
	effects: {
		roll: {
			enabled: false,
			options: {
				speed: 1000
			}
		},
		image: {
			enabled: true,
			options: {
				src: "./comingsoon.png",				
				blur: 1.2
			}
		},
		vignette: { enabled: true },
		scanlines: { enabled: true },
		vcr: {
			enabled: true,
			options: {
				opacity: 1,
				miny: 220,
				miny2: 220,
				num: 70,
				fps: 60
			}
		},
		wobbley: { enabled: true },
		snow: {
			enabled: true,
			options: {
				opacity: 0.2
			}			
		},
	},
};

const f1 = gui.addFolder("Effects");
const f2 = gui.addFolder("Snow");
const f3 = gui.addFolder("VCR");
const f4 = gui.addFolder("Roll");
const f5 = gui.addFolder("Image");

for ( const effect in config.effects ) {
	const type = config.effects[effect];
	f1.add(type, "enabled").name(effect).onChange(bool => {
		if ( bool ) {
			screen.add(effect, config.effects[effect].options);
		} else {
			screen.remove(effect);
		}
	});
	
	if ( type.options ) {
		let folder = effect === "vcr" || effect === "video" ? f3 : f2;
		for ( const p in type.options ) {
			
			if ( p === "speed" ) {
				f4.add(type.options, p).min(100).step(1).max(10000).onChange(val => {
					screen.effects[effect].node.style.animationDuration = `${val}ms`;
				});
			}
			
			if ( p === "opacity" ) {
				folder.add(type.options, p).name(`${effect} opacity`).min(0).step(0.1).max(1).onChange(val => {
					screen.effects[effect].node.style.opacity = val;
				});
			}
			
			if ( p === "miny" ) {
				folder.add(type.options, p).name(`tracking`).min(0).step(0.1).max(400).onChange(val => {
					screen.effects[effect].config.miny = val;
					screen.effects[effect].config.miny2 = 400 - val;
				});
			}
			
			if ( p === "num" ) {
				folder.add(type.options, p).name(`tape age`).min(1).step(0.1).max(100).onChange(val => {
					screen.effects[effect].config.num = val;
				});
			}
			
			if ( p === "blur" ) {
				f5.add(type.options, p).name(`blur`).min(1).step(0.1).max(5).onChange(val => {
					if ( effect === "vcr" ) {
						screen.effects[effect].config.blur = val;
					} else {
						screen.effects[effect].node.style.filter = `blur(${val}px)`;
					}
				});
			}				
		}
	}
}


f1.open();
f2.open();
f3.open();
f4.open();
f5.open();

setTimeout(() => {
	for ( const prop in config.effects ) {
		if ( !!config.effects[prop].enabled ) {
			screen.add(prop, config.effects[prop].options);
		}
	}
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
	const effectsButton = document.getElementById('toggle-effects');
	const gui = document.querySelector('.dg.ac');
	
	// Initially hide the effects panel
	gui.style.display = 'none';
	
	effectsButton.addEventListener('click', function() {
		if (gui.style.display === 'none') {
			gui.style.display = 'block';
			// Use setTimeout to ensure the display change has taken effect
			setTimeout(() => {
				gui.classList.add('visible');
			}, 10);
		} else {
			gui.classList.remove('visible');
			// Wait for the transition to complete before hiding
			setTimeout(() => {
				gui.style.display = 'none';
			}, 300);
		}
	});

	// Set the background image when the page loads
	const screenContainer = document.getElementById('screen');
	screenContainer.style.backgroundImage = "url('assets/background.gif')";
});