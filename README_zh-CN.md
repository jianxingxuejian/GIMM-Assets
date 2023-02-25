<h1 align="center">GIMM-Assets</h1>

[English](README.md) | 简体中文

该库的数据用于 [GIMM](https://github.com/jianxingxuejian/GIMM) 的 Mods 管理功能中实现 Mods 的自动分类，对于一个管理器来说，扫描所有 mods 只能遍历所有 ini 文件，但是 ini 文件本身并不附带元数据，所以无法得知这个 mod 的具体分类。
最简单的办法就是穷举所有可能的 ini 文件名，并进行分类，该库已经有一些从 [GI-Model-Importer-Assets](https://github.com/SilentNightSound/GI-Model-Importer-Assets) 解析而来的数据，大部分角色、武器、npc 的数据已经有了，其余的可能需要手工补全，请帮忙贡献这个仓库的数据补全、更新。

数据位于 data 文件夹下，只需要将ini名称添加上去就行，例如在 `Character.txt` 下的第一行是: `Albedo`，这样我们就知道了`Albedo.ini`这个文件所在的 mod 是角色 mod，并且角色是阿贝多，mod 管理程序才能正确的在没有任何手动选择操作下完成分类。
