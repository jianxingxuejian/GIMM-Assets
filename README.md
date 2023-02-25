<h1 align="center">GIMM-Assets</h1>

English | [简体中文](README_zh-CN.md)

The data in this repository is used for the automatic categorization of mods in the Mods management feature of [GIMM](https://github.com/jianxingxuejian/GIMM). For a manager, scanning all mods can only traverse all ini files. However, the ini files themselves don't come with metadata, so it is impossible to know the specific category of the mod.

The simplest solution is to exhaustively enumerate all possible ini file names and classify them. This repository already has some data parsed from [GI-Model-Importer-Assets](https://github.com/SilentNightSound/GI-Model-Importer-Assets), with data for most characters, weapons, and NPCs already included. The rest may need to be manually completed, so please contribute to the data completion and update of this repository.

The data is located in the data folder. Just add the ini name to it. For example, the first line under `Character.txt` is: `Albedo`. This tells us that the mod in the `AlbedoMod.ini` file is a character mod and the character is Albedo. With this information, the mod management program can correctly classify the mod without any manual selection operations.
