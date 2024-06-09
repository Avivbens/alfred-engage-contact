<div align=center>

# Alfred Engage Contact

<br>

[![Latest Version Downloads](https://img.shields.io/github/downloads/avivbens/alfred-engage-contact/latest/total?label=Latest%20Version%20Downloads&color=green)](https://github.com/avivbens/alfred-engage-contact/releases/latest)
[![Latest Version](https://img.shields.io/github/v/release/avivbens/alfred-engage-contact?label=Latest%20Version&color=green)](https://github.com/avivbens/alfred-engage-contact/releases/latest)
[![Total Downloads](https://img.shields.io/github/downloads/avivbens/alfred-engage-contact/total?label=Total%20Downloads&color=blue)](https://github.com/avivbens/alfred-engage-contact/releases)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/kcao7snkgx)

</div>

## Description

Search contacts and engage with them via [Alfred](https://www.alfredapp.com/).

### Fuzzy Search

We support fuzzy search :ninja:

You can search for a contact by typing a part of their name or phone number

### Install via GitHub Releases :sparkles:

```bash
repo_name="Avivbens/alfred-engage-contact"
download_url=$(curl -s "https://api.github.com/repos/$repo_name/releases/latest" | grep "browser_download_url.*alfredworkflow" | cut -d '"' -f 4)

curl -fsSLk $download_url -o ~/Desktop/alfred-engage-contact.alfredworkflow
open ~/Desktop/alfred-engage-contact.alfredworkflow
```

<hr>

## Usage

Search contacts via the keyword `ec<RELATED_APP>`.
A list of all matched contacts will be displayed, and you can select a contact by pressing `Enter`.

### Supported Apps

-   WhatsApp: `ecw`
-   SMS: `ecs`
-   Call: `ecc`
-   Mail: `ecm`

Once you select a contact, the workflow will open the related app with the selected contact.

## Supported Phone Number Formats

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
