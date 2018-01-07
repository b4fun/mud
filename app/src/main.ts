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
    .add('tile_sand01', 'hexagonPack/PNG/Tiles/Terrain/Sand/sand_01.png')
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

        hexagonMap.setTexture(0, 0, resources.tile_sand01.texture)
        hexagonMap.setTexture(0, 1, resources.tile_sand01.texture)
        hexagonMap.setTexture(1, 1, resources.tile_sand01.texture)
        hexagonMap.setTexture(3, 3, resources.tile_sand01.texture)
        hexagonMap.setTexture(7, 4, resources.tile_sand01.texture)
        hexagonMap.setTexture(4, 4, resources.tile_sand01.texture)

        hexagonMap.render(app.stage)
    })