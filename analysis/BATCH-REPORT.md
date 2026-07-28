# Batch Report — Instagram Post template analysis

Generated: 2026-07-28T13:12:34+00:00

> Scope: **analysis and asset collection only.** No HTML, CSS or renderer manifest is produced by this batch.

## Run summary

| Metric | Value |
|---|---|
| Templates in pool | 200 |
| Analysed successfully | 200 |
| Failed | 0 |
| State | complete |
| Started | 2026-07-28T12:44:37+00:00 |
| Updated | 2026-07-28T13:03:47+00:00 |

## Asset outcomes

| Class | Count | Meaning |
|---|---|---|
| Exact | 1009 | original file collected from source (reference renders, font files) |
| Approximate | 200 | reconstructed, clearly labelled, never presented as exact |
| Missing | 203 | recorded and skipped without halting the batch |

Every template records one unavoidable missing asset: the original unflattened background photograph. Pixy's API exposes only a flattened render, with no layer or asset endpoint.

## Font identification

Two separate things are reported, and only the second carries uncertainty.

### 1. Font family — authoritative

Pixy's `/templates` endpoint declares the font families used by each template, so families are **read, not inferred from pixels**. This is the single most useful thing the API exposes for analysis purposes.

### 2. Fitted metrics — estimated

Size, weight, width axis and tracking are recovered by rendering candidates and scoring them against the reference glyph ink with a scale-normalised IoU.

| Fit score | Elements | Meaning |
|---|---|---|
| high | 382 | fitted metrics closely reproduce the reference ink |
| medium | 196 | reproduces well, minor drift |
| low | 94 | plausible but unverified |
| very-low | 444 | not verified — usually corrupted OCR text or per-character placement |
| unresolved | 10 | no candidate could be rendered |

**A low fit score does not mean the font family is wrong.** The score is a conservative lower bound. Measured across this batch, OCR text quality is the dominant driver: elements with OCR confidence below 0.90 average an IoU of 0.27, while those above 0.98 average 0.53. Where a text string is corrupted (for example `confdence`, `delivereffortless`), the comparison penalises the fit even when family and size are correct. Such elements are flagged with `textReliability.reliable = false`.

Two alternative scoring metrics were trialled and rejected on measurement:

| Alternative | Result | Decision |
|---|---|---|
| Tracking + size refinement sweep | mean IoU gain of only +0.025 | rejected, not worth a full re-run |
| Height-normalised IoU with shift search | mean IoU **-0.254** | rejected, ink height depends on which ascenders/descenders a line contains, so normalising by height misscales the candidate |

The box-normalised IoU retained here was the best of the three.

## Font families that could not be resolved

| Family | Templates affected |
|---|---|
| Six Caps | 1 |
| Source Serif Pro | 1 |
| Arizonia | 1 |

## Per-template index

| # | Name | Text elements | Exact | Approx | Missing |
|---|---|---|---|---|---|
| 001 | Design 17 (Tea Tree Oil) | 3 | 11 | 1 | 1 |
| 002 | Instagram post | 4 | 3 | 1 | 1 |
| 003 | Instagram post | 11 | 6 | 1 | 1 |
| 004 | Instagram post | 13 | 10 | 1 | 1 |
| 005 | Instagram post | 10 | 10 | 1 | 1 |
| 006 | Instagram post | 13 | 10 | 1 | 1 |
| 007 | Instagram post | 11 | 10 | 1 | 1 |
| 008 | Instagram post | 7 | 2 | 1 | 1 |
| 009 | Instagram post | 4 | 10 | 1 | 1 |
| 010 | Instagram post | 6 | 10 | 1 | 1 |
| 011 | Instagram post | 5 | 11 | 1 | 1 |
| 012 | Instagram post | 5 | 4 | 1 | 1 |
| 013 | Instagram post | 6 | 10 | 1 | 1 |
| 014 | Instagram post | 5 | 10 | 1 | 1 |
| 015 | Instagram post 10 | 4 | 9 | 1 | 1 |
| 016 | Instagram post 8 | 33 | 10 | 1 | 1 |
| 017 | Instagram post 7 | 11 | 11 | 1 | 1 |
| 018 | Instagram post 5 | 9 | 10 | 1 | 1 |
| 019 | Instagram post 4 | 6 | 10 | 1 | 1 |
| 020 | Instagram post 2 | 4 | 10 | 1 | 1 |
| 021 | Modern Fashion Promotion Template Instagram post | 13 | 10 | 1 | 1 |
| 022 | Summer Fashion Promotion Template Instagram post | 7 | 4 | 1 | 1 |
| 023 | Instagram post | 7 | 4 | 1 | 1 |
| 024 | Premium Performance Showcase Instagram post | 7 | 10 | 1 | 1 |
| 025 | Instagram post | 7 | 10 | 1 | 1 |
| 026 | Fashion Sale Promotion Template Instagram post | 7 | 4 | 1 | 1 |
| 027 | Healthy Food Promotion Template Instagram post | 4 | 4 | 1 | 1 |
| 028 | Instagram post | 9 | 4 | 1 | 1 |
| 029 | Instagram post | 4 | 12 | 1 | 1 |
| 030 | Instagram post | 8 | 12 | 1 | 1 |
| 031 | headphone Instagram post | 2 | 3 | 1 | 1 |
| 032 | Super Sale Instagram post | 4 | 3 | 1 | 1 |
| 033 | Speaker Instagram post | 5 | 4 | 1 | 1 |
| 034 | Sofa Design Instagram post | 5 | 8 | 1 | 1 |
| 035 | Glasses Protection Instagram post | 6 | 5 | 1 | 1 |
| 036 | Beauty Serum Instagram post | 7 | 5 | 1 | 1 |
| 037 | Shoes Collection Instagram post | 3 | 3 | 1 | 1 |
| 038 | Minimal Editorial Fashion Template Instagram post | 3 | 4 | 1 | 1 |
| 039 | Chair Sale Instagram post | 2 | 4 | 1 | 1 |
| 040 | New Fashion Launch Instagram post | 4 | 10 | 1 | 1 |
| 041 | Elegant Relaxation Therapy Instagram post design | 6 | 4 | 1 | 1 |
| 042 | Instagram post | 14 | 5 | 1 | 1 |
| 043 | Instagram post | 12 | 10 | 1 | 1 |
| 044 | Minimal Elegance Layout Instagram post | 5 | 3 | 1 | 1 |
| 045 | Modern Monochrome Portrait Layout Instagram post | 10 | 5 | 1 | 1 |
| 046 | Phone instagram post | 9 | 4 | 1 | 1 |
| 047 | Instagram post | 5 | 4 | 1 | 1 |
| 048 | Instagram post | 7 | 3 | 1 | 1 |
| 049 |  whey protein powder Instagram post | 27 | 2 | 1 | 1 |
| 050 | Minimal furniture instagram post template | 9 | 5 | 1 | 1 |
| 051 | Cosmetic instagram post | 12 | 9 | 1 | 1 |
| 052 | Sales instagram post template | 3 | 9 | 1 | 1 |
| 053 | Social media and instagram post template | 10 | 4 | 1 | 1 |
| 054 | Simple Elegant Wardrobe PromotionInstagram post | 12 | 11 | 1 | 1 |
| 055 | Instagram post client testimonials | 7 | 5 | 1 | 1 |
| 056 | Instagram fashion new collection | 3 | 11 | 1 | 1 |
| 057 | Instagram inspirational quote | 9 | 3 | 1 | 1 |
| 058 | Instagram motivation post | 4 | 4 | 1 | 1 |
| 059 | Instagram post fashion sale | 9 | 5 | 1 | 1 |
| 060 | Instagram post fitness coach | 5 | 4 | 1 | 1 |
| 061 | Instagram post podcast men | 4 | 6 | 1 | 1 |
| 062 | Instagram post quote self | 3 | 3 | 1 | 1 |
| 063 | Instagram skincare 101 | 1 | 2 | 1 | 1 |
| 064 | Instagram baked post | 3 | 3 | 1 | 1 |
| 065 | Instagram giveaway post | 5 | 5 | 1 | 1 |
| 066 | Instagram giveaway post 2 | 8 | 5 | 1 | 1 |
| 067 | Instagram post black friday | 3 | 3 | 1 | 1 |
| 068 | Instagram post chart pyramid | 6 | 4 | 1 | 1 |
| 069 | Instagram post fashion playful | 6 | 4 | 1 | 1 |
| 070 | Instagram post free shipping | 2 | 4 | 1 | 1 |
| 071 | Instagram post green plants | 5 | 2 | 1 | 1 |
| 072 | Instagram post healthy food | 5 | 4 | 1 | 1 |
| 073 | Instagram post home decor | 2 | 2 | 1 | 1 |
| 074 | Instagram post infographic chart | 3 | 2 | 1 | 1 |
| 075 | Instagram post interior estate | 5 | 6 | 1 | 1 |
| 076 | Instagram post movational quote | 3 | 6 | 1 | 1 |
| 077 | Instagram post natural esssentials | 3 | 4 | 1 | 1 |
| 078 | Instagram post ootd outfit | 4 | 3 | 1 | 1 |
| 079 | Instagram post ootd style | 4 | 3 | 1 | 1 |
| 080 | Instagram post pizza notification | 5 | 4 | 1 | 1 |
| 081 | Instagram post quotes negativity | 4 | 5 | 1 | 1 |
| 082 | Instagram post reminder motivation | 7 | 4 | 1 | 1 |
| 083 | Instagram post sports competition | 4 | 4 | 1 | 1 |
| 084 | Instagram post thanksgiving celebration | 5 | 7 | 1 | 1 |
| 085 | Instagram post travel vacation | 4 | 4 | 1 | 1 |
| 086 | Instagram post yellow plants | 7 | 4 | 1 | 1 |
| 087 | Instagram post beauty cosmetic hair priducts clean modern | 11 | 4 | 1 | 1 |
| 088 | Instagram post food sweat cupcakes cake bakery foodie pink | 6 | 6 | 1 | 1 |
| 089 | Instagram post frame home message quote inspiring | 2 | 3 | 1 | 1 |
| 090 | Instagram post hiring job | 8 | 6 | 1 | 1 |
| 091 | Instagram post technology event announcement science computer workshop | 10 | 6 | 1 | 1 |
| 092 | Instagram post covid 19 carona virus medical | 15 | 5 | 1 | 1 |
| 093 | Instagram post emoji feeling fun interesting question | 1 | 2 | 1 | 1 |
| 094 | Instagram post quotation love romantic heartbreak | 5 | 4 | 1 | 1 |
| 095 | Instagram post resturant food open opening timming | 20 | 4 | 1 | 1 |
| 096 | Instagram post workout exercise training class session online | 6 | 6 | 1 | 1 |
| 097 | Instagram covid post | 16 | 6 | 1 | 1 |
| 098 | Instagram post baseball sports | 6 | 4 | 1 | 1 |
| 099 | Instagram post breakfast burger | 3 | 4 | 1 | 1 |
| 100 | Instagram post brown class | 5 | 4 | 1 | 1 |
| 101 | Instagram post cake bakery | 4 | 3 | 1 | 1 |
| 102 | Instagram post client testemonials | 9 | 4 | 1 | 1 |
| 103 | Instagram post education graduation | 3 | 5 | 1 | 1 |
| 104 | Instagram post fashion model | 5 | 3 | 1 | 1 |
| 105 | Instagram post fashion sale | 5 | 3 | 1 | 1 |
| 106 | Instagram post fashion trends | 6 | 3 | 1 | 1 |
| 107 | Instagram post life quote | 7 | 5 | 1 | 1 |
| 108 | Instagram post pancake pastries | 3 | 3 | 1 | 1 |
| 109 | Instagram post sale clothes | 5 | 3 | 1 | 1 |
| 110 | Instagram post spring sale | 7 | 4 | 1 | 1 |
| 111 | Instagram post thankyou message | 3 | 5 | 1 | 1 |
| 112 | Instagram post thankyou notification | 4 | 3 | 1 | 1 |
| 113 | Instagram post travel goals | 3 | 4 | 1 | 1 |
| 114 | Instagram post vintage cars | 2 | 4 | 1 | 1 |
| 115 | Instagram bingo post | 7 | 3 | 1 | 1 |
| 116 | Instagram fashion post | 5 | 2 | 1 | 1 |
| 117 | Instagram ad reopen sale black friday shop shopping store | 3 | 3 | 1 | 1 |
| 118 | Instagram ad resturant food offer deal prize sale announcement | 3 | 2 | 1 | 1 |
| 119 | Instagram ad shop shoppinh sale jewllery | 2 | 4 | 1 | 1 |
| 120 | Instagram post black blue | 3 | 3 | 1 | 1 |
| 121 | Instagram post boho style | 5 | 9 | 1 | 1 |
| 122 | Instagram post chinese new year | 3 | 2 | 1 | 1 |
| 123 | Instagram post christmas greetings | 2 | 2 | 1 | 1 |
| 124 | Instagram post fashion discount | 6 | 7 | 1 | 1 |
| 125 | Instagram post flowers bloom | 2 | 4 | 1 | 1 |
| 126 | Instagram post furniture sale | 2 | 2 | 1 | 1 |
| 127 | Instagram post give away | 3 | 4 | 1 | 1 |
| 128 | Instagram post hustle definition | 6 | 5 | 1 | 1 |
| 129 | Instagram post jewelry collection | 3 | 6 | 1 | 1 |
| 130 | Instagram post message notification | 6 | 13 | 1 | 1 |
| 131 | Instagram post mood board | 1 | 3 | 1 | 1 |
| 132 | Instagram post pancake sale | 11 | 4 | 1 | 1 |
| 133 | Instagram post quote self | 3 | 2 | 1 | 1 |
| 134 | Instagram post red fashion | 6 | 5 | 1 | 1 |
| 135 | Instagram post red flavors | 10 | 4 | 1 | 1 |
| 136 | Instagram post restaurant coming | 4 | 4 | 1 | 1 |
| 137 | Instagram post self quote | 7 | 3 | 1 | 1 |
| 138 | Instagram post self reminder | 5 | 8 | 1 | 1 |
| 139 | Instagram post valentines day | 3 | 4 | 1 | 1 |
| 140 | Instagram independence post | 9 | 4 | 1 | 1 |
| 141 | Instagram music post | 3 | 3 | 1 | 1 |
| 142 | Instagram post back to school school class classroom | 3 | 3 | 1 | 1 |
| 143 | Instagram post coffee funny hummor drink funny | 5 | 4 | 1 | 1 |
| 144 | Instagram post contest photography winner winning test picture | 15 | 8 | 1 | 1 |
| 145 | Instagram post knowladge learning book books learn | 2 | 3 | 1 | 1 |
| 146 | Instagram post real estate house home rent realtor | 31 | 4 | 1 | 2 |
| 147 | Instagram post women women s day female power women empowerment | 7 | 4 | 1 | 1 |
| 148 | Instagram post covid 19 mask masks hygine | 7 | 4 | 1 | 1 |
| 149 | Instagram post cooking cook cooking class chef learn | 5 | 3 | 1 | 1 |
| 150 | Instagram post eco friednly trees nature go green environment planting trees vector fun | 2 | 4 | 1 | 1 |
| 151 | Instagram post new year happy new year chineese new year china tradition festive celebration | 4 | 3 | 1 | 1 |
| 152 | Instagram post pricing table packages interior design buisiness | 6 | 4 | 1 | 1 |
| 153 | Instagram post puppy dog pet adoption adopt caring adorable | 3 | 3 | 1 | 1 |
| 154 | Instagram post quote life beautiful saying | 6 | 4 | 1 | 1 |
| 155 | Instagram post vector fun organize organizing cool modern | 9 | 4 | 1 | 1 |
| 156 | Instagram quote funny hilarious saying | 4 | 5 | 1 | 1 |
| 157 | Instagram post blue vibes | 5 | 6 | 1 | 1 |
| 158 | Instagram post boho style | 8 | 4 | 1 | 1 |
| 159 | Instagram post brown beverages | 1 | 3 | 1 | 1 |
| 160 | Instagram post cartoon bicycle | 2 | 5 | 1 | 1 |
| 161 | Instagram post cartoon yoga | 3 | 4 | 1 | 1 |
| 162 | Instagram post chart infographics | 6 | 2 | 1 | 1 |
| 163 | Instagram post colorful designs | 5 | 4 | 1 | 1 |
| 164 | Instagram post covid symptoms | 11 | 8 | 1 | 1 |
| 165 | Instagram post discount items | 3 | 4 | 1 | 1 |
| 166 | Instagram post earth day | 2 | 4 | 1 | 1 |
| 167 | Instagram post green phography | 4 | 2 | 1 | 1 |
| 168 | Instagram post illustrator fitness | 4 | 9 | 1 | 1 |
| 169 | Instagram post merry christmas | 2 | 3 | 1 | 1 |
| 170 | Instagram post purple sports | 3 | 7 | 1 | 1 |
| 171 | Instagram post realestate soldout | 3 | 8 | 1 | 1 |
| 172 | Instagram post self care | 6 | 4 | 1 | 1 |
| 173 | Instagram post self quote | 7 | 9 | 1 | 1 |
| 174 | Instagram post working home | 8 | 10 | 1 | 1 |
| 175 | Instagram post self quote | 5 | 4 | 1 | 1 |
| 176 | Instagram post consulting buisiness corporate women small buisiness | 27 | 5 | 1 | 1 |
| 177 | Instagram post marketing email services technology modern | 11 | 4 | 1 | 1 |
| 178 | Instagram post bathroom essentials | 6 | 4 | 1 | 1 |
| 179 | Instagram post beauty purple | 6 | 5 | 1 | 1 |
| 180 | Instagram post beauty spa | 3 | 2 | 1 | 1 |
| 181 | Instagram post beuty tips | 6 | 4 | 1 | 1 |
| 182 | Instagram post blue skincare | 7 | 3 | 1 | 1 |
| 183 | Instagram post boho definition | 5 | 7 | 1 | 1 |
| 184 | Instagram post facial brown | 6 | 3 | 1 | 1 |
| 185 | Instagram post facial serum | 14 | 4 | 1 | 1 |
| 186 | Instagram post happy birthday | 5 | 6 | 1 | 2 |
| 187 | Instagram post heart love | 2 | 7 | 1 | 1 |
| 188 | Instagram post massage relax | 3 | 4 | 1 | 1 |
| 189 | Instagram post sale blob | 3 | 5 | 1 | 1 |
| 190 | Instagram post serum notification | 10 | 5 | 1 | 1 |
| 191 | Instagram post skin care | 2 | 2 | 1 | 1 |
| 192 | Instagram post skin serum | 10 | 2 | 1 | 1 |
| 193 | Instagram post thankyou followers | 4 | 4 | 1 | 1 |
| 194 | Instagram post valentines day | 1 | 2 | 1 | 1 |
| 195 | Instagram post nature adventure rocks text content writing | 21 | 4 | 1 | 1 |
| 196 | Instagram post profile character employee contestents | 16 | 6 | 1 | 1 |
| 197 | Instagram post quote data science | 11 | 6 | 1 | 1 |
| 198 | Instagram post work out exercise meditation | 12 | 6 | 1 | 1 |
| 199 | Instagram beautytips post | 8 | 2 | 1 | 2 |
| 200 | Instagram followers post | 4 | 3 | 1 | 1 |
