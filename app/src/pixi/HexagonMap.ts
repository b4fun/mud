import * as PIXI from 'pixi.js'

export interface IHexagonSettings {
    texture: PIXI.Texture
}

export default class HexagonMap {

    // row height base on hexagon height
    // ~= 2 * (1 + sqrt3) / (1 + sqrt3 + 1)
    static readonly ROW_HEIGHT_FACTOR = 1.5

    readonly width: number
    readonly height: number
    readonly hexagonWidth: number
    readonly hexagonHeight: number
    readonly rows: number
    readonly cols: number

    readonly defaultTexture: PIXI.Texture

    readonly hexagonSettings: {[key: number]: IHexagonSettings}

    constructor(
        width, height: number,
        hexagonWidth, hexagonHeight: number,
        defaultTexture: PIXI.Texture,
    ) {
        this.width = width
        this.height = height
        this.hexagonWidth = hexagonWidth
        this.hexagonHeight = hexagonHeight

        this.rows = Math.ceil((height * HexagonMap.ROW_HEIGHT_FACTOR) / hexagonHeight)
        this.cols = Math.ceil((width + hexagonWidth / 2) / hexagonWidth)

        this.defaultTexture = defaultTexture
        this.hexagonSettings = {}
    }

    render(c: PIXI.Container) {
        const yOffsetStep = this.hexagonHeight * HexagonMap.ROW_HEIGHT_FACTOR
        let evenYOffset = 0, oddYOffset = this.hexagonHeight
        for (let i = 0; i < this.rows; i++) {
            const isEvenRow = i % 2 === 0

            for (let j = 0; j < this.cols; j++) {
                const sprite = this.makeSprite(i, j)
                sprite.x = j * this.hexagonWidth
                if (isEvenRow) {
                    sprite.anchor.set(.5, .25)
                    sprite.y = evenYOffset
                } else {
                    sprite.anchor.set(0, .5)
                    sprite.y = oddYOffset
                }

                c.addChild(sprite)
            }

            if (isEvenRow) {
                evenYOffset += yOffsetStep
            } else {
                oddYOffset += yOffsetStep
            }
        }
    }

    makeSprite(x, y: number): PIXI.Sprite {
        const settings = this.getHexagonSettings(x, y)
        const sprite = new PIXI.Sprite(settings.texture)
        sprite.width = this.hexagonWidth
        sprite.height = this.hexagonHeight

        return sprite
    }

    setHexagon(x, y: number, settings: IHexagonSettings): HexagonMap {
        this.hexagonSettings[this.getPos(x, y)] = settings

        return this
    }

    setTexture(x, y: number, texture: PIXI.Texture): HexagonMap {
        return this.setHexagon(
            x, y,
            Object.assign(
                {},
                this.getHexagonSettings(x, y),
                { texture, },
            ),
        )
    }

    private getPos(x, y: number): number {
        return y * this.rows + x
    }

    private getHexagonSettings(x, y: number): IHexagonSettings {
        const pos = this.getPos(x, y)
        if (this.hexagonSettings[pos]) {
            return this.hexagonSettings[pos]
        }

        return this.defaultHexagonSettings()
    }

    private defaultHexagonSettings(): IHexagonSettings {
        return {
            texture: this.defaultTexture,
        }
    }

}