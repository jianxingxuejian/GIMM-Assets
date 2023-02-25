import fs from 'fs-extra'

const distPath = './dist/'
const readFile = (path: string) => fs.readFileSync(path, 'utf-8')
const readDir = (path: string) => fs.readdirSync(path, 'utf-8')
const parse = (str: string) => str.split('\n')

const convertToSet = (params: { name: string; data: string[] }[]) =>
    params.map(
        ({ name, data }) =>
            `pub const ${name}: phf::Set<&'static str> = phf::phf_set! {
${data.map(value => `  "${value}",`).join('\n')}
};`
    )

function convert() {
    const characterData = parse(readFile('../data/Character.txt'))
    const npcData = parse(readFile('../data/NPC.txt'))
    const enemyData = parse(readFile('../data/Enemy.txt'))
    const entitiesData = parse(readFile('../data/Entities.txt'))
    const objectData = parse(readFile('../data/Object.txt'))
    const tcgcardData = parse(readFile('../data/TCGCard.txt'))
    const weaponData = readDir('../data/WeaponData')
        .map(file => parse(readFile(`../data/WeaponData/${file}`)))
        .flat()

    const firstLine = 'use tauri::utils::assets::phf;'
    const rustContent =
        firstLine +
        '\n\n' +
        convertToSet([
            { name: 'CHARACTER_SET', data: characterData },
            { name: 'NPC_SET', data: npcData },
            { name: 'ENEMY_SET', data: enemyData },
            { name: 'WEAPON_SET', data: weaponData },
            { name: 'ENTITIES_SET', data: entitiesData },
            { name: 'OBJECT_SET', data: objectData },
            { name: 'TCGCARD_SET', data: tcgcardData }
        ]).join('\n\n')

    fs.mkdirSync(distPath, { recursive: true })
    fs.writeFileSync(`${distPath}constant.rs`, rustContent)
}

convert()
