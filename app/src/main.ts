import * as PIXI from 'pixi.js'
require('./style/style.css')

import HexagonMap from './pixi/HexagonMap'

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

        const scale = .5
        const hexagonWidth = sandTexture.width * scale
        const hexagonHeight = sandTexture.height * scale
        const hexagonMap = new HexagonMap(
            MAP_SIZE.width, MAP_SIZE.height,
            hexagonWidth, hexagonHeight,
            sandTexture,
        )

        hexagonMap.render(app.stage)
    })