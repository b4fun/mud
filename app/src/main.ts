import * as PIXI from 'pixi.js'
require('./style/style.css')

import renderHexagonMap from './pixi/hexagon_render'

const MAP_SIZE = {
    width: window.innerWidth,
    height: window.innerHeight,
}
const app = new PIXI.Application({
    width: MAP_SIZE.width,
    height: MAP_SIZE.height,
})
document.body.appendChild(app.view)

PIXI.loader
    .add('tile_sand', 'hexagonPack/PNG/Tiles/Terrain/Sand/sand_02.png')
    .load((loader, resources) => {
        const sandTexture: PIXI.Texture = resources.tile_sand.texture

        renderHexagonMap(
            app.stage,
            sandTexture,
            MAP_SIZE.width,
            MAP_SIZE.height,
            .7,
        )
    })