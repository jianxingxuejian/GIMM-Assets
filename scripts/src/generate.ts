import fs from 'fs-extra'

const filePath = '../../GI-Model-Importer-Assets/'
const distPath = './dist/'
const read = (path: string) => fs.readdirSync(filePath + path, 'utf-8')

function generate() {
    const characters = read('PlayerCharacterData')
    writeTxt(characters, 'Character.txt')
    const enemys = read('EnemyData')
    writeTxt(enemys, 'Enemy.txt')
    const npcs = read('NPCData')
    writeTxt(npcs, 'NPC.txt')
    writeWeaponTxt('WeaponData')
}

function getBottomLevelFolders(path: string): string[] {
    const folders = read(path)
    const result = []
    for (const folder of folders) {
        const folderPath = `${path}/${folder}`
        const stat = fs.statSync(`${filePath}${folderPath}`)
        if (stat.isDirectory()) {
            const subFolders = read(folderPath)
            if (subFolders.every(subFolder => fs.statSync(`${filePath}${folderPath}/${subFolder}`).isFile())) {
                result.push(folder)
            } else {
                result.push(...getBottomLevelFolders(folderPath))
            }
        }
    }
    return result
}

function writeTxt(arr: string[], fileName: string) {
    const txt = arr.join('\n')
    const writePath = `${distPath}${fileName}`
    if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath)
    }
    fs.writeFileSync(writePath, txt)
}

function writeWeaponTxt(path: string) {
    const folders = read(path)
    for (const folder of folders) {
        const folderPath = `${path}/${folder}`
        const weapons = getBottomLevelFolders(folderPath)
        const fileName = `${folder}.txt`
        const writePath = `${distPath}${path}/${fileName}`
        if (!fs.existsSync(`${distPath}${path}`)) {
            fs.mkdirSync(`${distPath}${path}`)
        }
        const txt = weapons.join('\n')
        fs.writeFileSync(writePath, txt)
    }
}

generate()
