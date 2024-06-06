<div align=center>

# Alfred Open WhatsApp

<br>

[![Latest Version Downloads](https://img.shields.io/github/downloads/avivbens/alfred-open-whatsapp/latest/total?label=Latest%20Version%20Downloads&color=green)](https://github.com/avivbens/alfred-open-whatsapp/releases/latest)
[![Latest Version](https://img.shields.io/github/v/release/avivbens/alfred-open-whatsapp?label=Latest%20Version&color=green)](https://github.com/avivbens/alfred-open-whatsapp/releases/latest)
[![Total Downloads](https://img.shields.io/github/downloads/avivbens/alfred-open-whatsapp/total?label=Total%20Downloads&color=blue)](https://github.com/avivbens/alfred-open-whatsapp/releases)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/kcao7snkgx)

</div>

## Description

Search contacts and open a chat with them with [Alfred](https://www.alfredapp.com/).

### Install via GitHub Releases :sparkles:

```bash
repo_name="Avivbens/alfred-open-whatsapp"
download_url=$(curl -s "https://api.github.com/repos/$repo_name/releases/latest" | grep "browser_download_url.*alfredworkflow" | cut -d '"' -f 4)

curl -fsSLk $download_url -o ~/Desktop/alfred-open-whatsapp.alfredworkflow
open ~/Desktop/alfred-open-whatsapp.alfredworkflow
```

<hr>

## Usage

Search contacts via the keyword `ow`.
Once you select a contact, a chat will be opened with the WhatsApp app.

The workflow can accept a default country code, which will be used if the contact does not have a country code.

All formats of phone numbers are supported, including:

-   `+1-50-1234567`
-   `+1501234567`
-   `050-1234567`
-   `0501234567`
-   `(808) 1234 567`
-   `+1 (808) 1234 567`
-   `(808)1234567`
-   etc ...

To activate, **install globally via npm**:

```bash
npm i -g alfred-open-whatsapp
```

<hr>
<br>

# Examples

## LIVE DEMO:

https://user-images.githubusercontent.com/77183871/233869370-4fb24627-7151-462f-99b9-8b20c34e7518.mp4

<br>

## Search contact with keyword `ow`:

![Search contact](https://raw.githubusercontent.com/avivbens/alfred-open-whatsapp/HEAD/demo/search.png)

<br>
