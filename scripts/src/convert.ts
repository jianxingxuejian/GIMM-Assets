import fs from 'fs-extra'

const distPath = './dist/'
const readFile = (path: string) => fs.readFileSync(path, 'utf-8')
const readDir = (path: string) => fs.readdirSync(path, 'utf-8')
const parse = (str: string) => {
    const obj: Record<string, string> = {}
    str.split('\n').forEach(line => {
        const [key, value] = line.split('=').map(str => str.trim())
        if (key && value) {
            obj[key] = value
        }
    })
    return obj
}

const convertToMap = (params: { name: string; data: Record<string, string> }[]) =>
    params.map(
        ({ name, data }) =>
            `pub const ${name}: phf::Map<&'static str, &'static str> = phf::phf_map! {
${Object.entries(data)
    .map(([key, value]) => `  "${key}" => ${value}`)
    .join('\n')}
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
        .reduce((obj, item) => ({ ...obj, ...item }), {})

    const firstLine = 'use tauri::utils::assets::phf;'
    const rustContent =
        firstLine +
        '\n\n' +
        convertToMap([
            { name: 'CHARACTER_MAP', data: characterData },
            { name: 'NPC_MAP', data: npcData },
            { name: 'ENEMY_MAP', data: enemyData },
            { name: 'WEAPON_MAP', data: weaponData },
            { name: 'ENTITIES_MAP', data: entitiesData },
            { name: 'OBJECT_MAP', data: objectData },
            { name: 'TCGCARD_MAP', data: tcgcardData }
        ]).join('\n\n')

    fs.writeFileSync(`${distPath}constant.rs`, rustContent)
}

convert()
