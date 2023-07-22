import { IMass } from './count/system';
import { AstroObject } from './paint/AstroObject';

export const scale = 70;
export const radius = 4;
export const trail = 35;

export const populateAstroObjects = (
	masses: IMass[],
	ctx: CanvasRenderingContext2D
) => {
	masses.forEach((mass) => (mass.object = new AstroObject(ctx, trail, radius)));
};

// export const animate = () => {

// 	innerSolarSystem
// 		.updatePosition()
// 		.updateGravitationalInteraction()
// 		.updateVectors();
// 	ctx!.clearRect(0, 0, width, height);
// 	const massesLength = innerSolarSystem.masses.length;
// 	for (let i = 0; i < massesLength; i++) {
// 		const mass = innerSolarSystem.masses[i];

// 		const x = width / 2 + mass.position.x * scale;
// 		const y = height / 2 + mass.position.y * scale;

//         mass.object?.draw(x, y)

//         ctx!.font = "14px Arial";
//         ctx!.fillText(mass.name, x + 12, y + 4);
//         ctx!.fill();
// 	}

//     requestAnimationFrame(animate);
// };

