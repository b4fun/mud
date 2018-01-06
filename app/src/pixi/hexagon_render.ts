function renderEvenRow(
    container: PIXI.Container,
    texture: PIXI.Texture,
    textureWidth: number, textureHeight: number,
    width: number, y: number, scale: number,
) {
    const count = (width + textureWidth / 2) / textureWidth
    for (let i = 0; i < count; i++) {
        const sprite = new PIXI.Sprite(texture)
        sprite.anchor.set(.5, .25)
        sprite.scale.set(scale, scale)
        sprite.x = i * textureWidth
        sprite.y = y
        container.addChild(sprite)
    }
}

function renderOddRow(
    container: PIXI.Container,
    texture: PIXI.Texture,
    textureWidth: number, textureHeight: number,
    width: number, y: number, scale: number,
) {
    const count = width / textureWidth
    for (let i = 0; i < count; i++) {
        const sprite = new PIXI.Sprite(texture)
        sprite.anchor.set(0, .5)
        sprite.scale.set(scale, scale)
        sprite.x = i * textureWidth
        sprite.y = y
        container.addChild(sprite)
    }
}

export default function(
    container: PIXI.Container,
    texture: PIXI.Texture,
    width: number, height: number,
    scale: number,
) {
    const _s = (s: number) => scale * s
    const w = width
    const h = height
    const tw = _s(texture.width)
    const th = _s(texture.height)

    const rows = Math.ceil(h * 1.5 / th)
    const yOffsetStep = th * 1.5
    let evenYOffset = 0, oddYOffset = th
    for (let i = 0; i < rows; i++) {
        if (i % 2 === 0) {
            renderEvenRow(container, texture, tw, th, w, evenYOffset, scale)
            evenYOffset += yOffsetStep
        } else {
            renderOddRow(container, texture, tw, th, w, oddYOffset, scale)
            oddYOffset += yOffsetStep
        }
    }
}