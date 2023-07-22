import { AstroObject } from "../paint/AstroObject";

export interface IMass {
    name: string;
    object: AstroObject | null
	massa: number;
	position: {
		x: number;
		y: number;
		z: number;
	};
	vector: {
		x: number;
		y: number;
		z: number;
	};
	acceleration: {
		x: number;
		y: number;
		z: number;
	};
}

export interface IParams {
	g: number;
	dt: number;
	softeningConst: number;
	masses: IMass[];
}

export class System {
	g = 0;
	dt = 0;
	softeningConst = 0;
	masses: IMass[] = [];

	constructor(params: IParams) {
		this.g = params.g;
		this.dt = params.dt;
		this.softeningConst = params.softeningConst;
		this.masses = params.masses;
	}

	updatePosition() {
		const massesLength = this.masses.length;
		for (let i = 0; i < massesLength; i++) {
			const mass = this.masses[i];
			mass.position.x += mass.vector.x * this.dt;
			mass.position.y += mass.vector.y * this.dt;
			mass.position.z += mass.vector.z * this.dt;
		}
		return this;
	}

	updateVectors() {
		const massesLength = this.masses.length;
		for (let i = 0; i < massesLength; i++) {
			const mass = this.masses[i];
			mass.vector.x += mass.acceleration.x * this.dt;
			mass.vector.y += mass.acceleration.y * this.dt;
			mass.vector.z += mass.acceleration.z * this.dt;
		}
		return this;
	}

	updateGravitationalInteraction() {
		const massesLength = this.masses.length;
		for (let i = 0; i < massesLength; i++) {
			let ax = 0;
			let ay = 0;
			let az = 0;

			const massI = this.masses[i];

			for (let j = 0; j < massesLength; j++) {
				if (i !== j) {
					const massJ = this.masses[j];
					const dx = massJ.position.x - massI.position.x;
					const dy = massJ.position.y - massI.position.y;
					const dz = massJ.position.z - massI.position.z;
					const distSq = dx * dx + dy * dy + dz * dz;

					const f =
						(this.g * massJ.massa) /
						(distSq * Math.sqrt(distSq + this.softeningConst));
					ax += dx * f;
					ay += dy * f;
					az += dz * f;
				}
			}

			massI.acceleration.x = ax;
			massI.acceleration.y = ay;
			massI.acceleration.z = az;
		}
		return this;
	}
}

const g = 39.5;
const dt = 0.003;
const softeningConst = 0.15;

const masses: IMass[] = [
    {
        name: 'Sun',
        object: null,
        massa: 1,
        position: {
            x: -1.50324727873647e-6,
            y: -3.93762725944737e-6,
            z: -4.86567877183925e-8,
        },
        vector: {
            x: 3.1669325898331e-5,
            y: -6.85489559263319e-6,
            z: -7.90076642683254e-7,
        },
        acceleration: {
            x: 0,
            y: 0,
            z: 0,
        }
    },
    {
        name: 'Mercury',
        object: null,
        massa: 1.65956463e-7,
        position: {
            x: -0.346390408691506,
            y: -0.272465544507684,
            z: 0.00951633403684172,
        },
        vector: {
            x: 4.25144321778261,
            y: -7.61778341043381,
            z: -1.01249478093275
        },
        acceleration: {
            x: 0,
            y: 0,
            z: 0,
        },
    },
    {
        name: 'Venus',
        object: null,
        massa: 2.44699613e-6,
        position: {
            x: -0.168003526072526,
            y: 0.698844725464528,
            z: 0.0192761582256879,
        },
        vector: {
            x: -7.2077847105093,
            y: -1.76778886124455,
            z: 0.391700036358566
        },
        acceleration: {
            x: 0,
            y: 0,
            z: 0,
        },
    },
    {
        name: 'Earth',
        object: null,
        massa: 3.0024584e-6,
        position: {
            x: 0.648778995445634,
            y: 0.747796691108466,
            z: -3.22953591923124e-5,
        },
        vector: {
            x: -4.85085525059392,
            y: 4.09601538682312,
            z: -0.000258553333317722
        },
        acceleration: {
            x: 0,
            y: 0,
            z: 0,
        },
    },
    {
        name: 'Mars',
        object: null,
        massa: 3.213e-7,
        position: {
            x: -0.574871406752105,
            y: -1.395455041953879,
            z: -0.01515164037265145,
        },
        vector: {
            x: 4.9225288800471425,
            y: -1.5065904473191791,
            z: -0.1524041758922603
        },
        acceleration: {
            x: 0,
            y: 0,
            z: 0,
        },
    },
];

export const innerSolarSystem = new System({
	g,
	dt,
	masses: JSON.parse(JSON.stringify(masses)),
	softeningConst,
});
