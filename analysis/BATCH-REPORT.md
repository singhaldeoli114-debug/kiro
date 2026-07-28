# Batch Report — Instagram Post template analysis

Generated: 2026-07-28T15:54:26+00:00

> Scope: **analysis and asset collection only.** No HTML, CSS or renderer manifest is produced by this batch.

## Run summary

| Metric | Value |
|---|---|
| Templates in pool | 345 |
| Analysed successfully | 345 |
| Failed | 0 |
| State | complete |
| Started | 2026-07-28T14:44:50+00:00 |
| Updated | 2026-07-28T15:54:26+00:00 |

## Asset outcomes

| Class | Count | Meaning |
|---|---|---|
| Exact | 1593 | original file collected from source (reference renders, font files) |
| Approximate | 345 | reconstructed, clearly labelled, never presented as exact |
| Missing | 350 | recorded and skipped without halting the batch |

Every template records one unavoidable missing asset: the original unflattened background photograph. Pixy's API exposes only a flattened render, with no layer or asset endpoint.

## Analysis quality

| Metric | Value |
|---|---|
| Text elements analysed | 2032 |
| High or medium geometry fit | 1221 / 1933 fittable (63.2%) |
| Mean fit IoU (fittable text only) | 0.604 |
| Text-in-photograph (not editable type) | 99 |
| OCR text flagged for review | 175 / 2032 (8.6%) |

A low fit tier is **not promoted artificially**. Remaining low and very-low elements are retained as review flags because their flattened appearance uses a rendering model the solid-font fitter cannot reproduce reliably (commonly outlined/hollow text, duplicate shadow layers, overlapping word copies, curved/path text, or incomplete OCR capture).

## Font identification

Two separate things are reported, and only the second carries uncertainty.

### 1. Font family — authoritative

Pixy's `/templates` endpoint declares the font families used by each template, so families are **read, not inferred from pixels**. This is the single most useful thing the API exposes for analysis purposes.

### 2. Fitted metrics — estimated

Size, weight, width axis and tracking are recovered by rendering candidates and scoring them against the reference glyph ink with a scale-normalised IoU.

| Fit score | Elements | Meaning |
|---|---|---|
| high | 816 | fitted metrics closely reproduce the reference ink |
| medium | 405 | reproduces well, with minor residual drift |
| low | 240 | plausible but requires visual review before recreation |
| very-low | 452 | not verified — preserve the reference and review manually |
| unresolved | 20 | no candidate could be rendered |
| not-applicable-rasterText | 99 | text is part of a photograph, not an editable text layer |

**Font family and fitted geometry are separate claims.** The font-family list is authoritative because Pixy declares it. Size, weight, width and tracking remain fitted estimates and each element retains its own score. Text strings repaired for lost `fi`/`fl` ligatures or merged word gaps keep an audit trail in `textRepairs`; other suspicious OCR stays flagged instead of being silently rewritten.

Validated quality fixes applied across the batch:

- Variable-font axes are read from each font's `fvar` table. Filename axis order was proven unsafe because Archivo's filename and internal axis order differ.
- Text polarity is read from a background border ring. The former minority-class rule inverted large display text; fixing it moved `LESS NOISE.` from IoU 0.109 to 0.793 and `MORE` from 0.104 to 0.832.
- OCR boxes use horizontal padding only. Vertical padding captured fragments of adjacent lines; removing it raised mean IoU from 0.537 to 0.579.
- Multi-line blocks share a reconciled font, size and tracking instead of being fitted independently line by line.
- Raster text printed on photographed objects is classified as not applicable rather than being presented as a failed editable-font match.

## Font families that could not be resolved

| Family | Templates affected |
|---|---|
| Fredoka One | 2 |
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
| 061 | Instagram post podcast men | 5 | 6 | 1 | 1 |
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
| 078 | Instagram post ootd outfit | 7 | 3 | 1 | 1 |
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
| 201 | Instagram wfhtips post | 9 | 2 | 1 | 1 |
| 202 | Instagram worldmentalhealth post | 7 | 3 | 1 | 1 |
| 203 | Instagram post baby clothes | 5 | 3 | 1 | 1 |
| 204 | Instagram post baby purple | 6 | 5 | 1 | 1 |
| 205 | Instagram post creative illutration | 7 | 6 | 1 | 1 |
| 206 | Instagram post geomtric shapes | 3 | 4 | 1 | 1 |
| 207 | Instagram post green ear | 7 | 4 | 1 | 1 |
| 208 | Instagram post leaves sale | 3 | 4 | 1 | 1 |
| 209 | Instagram post lettering black | 16 | 4 | 1 | 1 |
| 210 | Instagram post new year | 3 | 3 | 1 | 1 |
| 211 | Instagram post orange black | 13 | 4 | 1 | 1 |
| 212 | Instagram post playful sunflower | 3 | 3 | 1 | 1 |
| 213 | Instagram post recycle leaf | 5 | 2 | 1 | 1 |
| 214 | Instagram post sale discount | 4 | 3 | 1 | 1 |
| 215 | Instagram post summer blue | 8 | 9 | 1 | 1 |
| 216 | Instagram post vaccination covid | 12 | 4 | 1 | 1 |
| 217 | Instagram post violet travel | 8 | 4 | 1 | 1 |
| 218 | Instagram post wedding date | 5 | 4 | 1 | 1 |
| 219 | Instagram post wedding invitation | 7 | 3 | 1 | 1 |
| 220 | Instagram post yellow pink | 5 | 5 | 1 | 1 |
| 221 | Instagram newarrival post | 2 | 2 | 1 | 1 |
| 222 | Instagram easter post | 3 | 2 | 1 | 1 |
| 223 | Instagram easter 2 post | 4 | 4 | 1 | 1 |
| 224 | Instagram mensday post | 3 | 2 | 1 | 1 |
| 225 | Instagram post breakfast healthy | 3 | 5 | 1 | 1 |
| 226 | Instagram post adopt pets | 6 | 7 | 1 | 1 |
| 227 | Instagram post black neon | 5 | 4 | 1 | 1 |
| 228 | Instagram post dog food | 3 | 2 | 1 | 1 |
| 229 | Instagram post food delivery | 6 | 4 | 1 | 1 |
| 230 | Instagram post good vibes | 3 | 3 | 1 | 1 |
| 231 | Instagram post japan vibe | 2 | 6 | 1 | 1 |
| 232 | Instagram post love cat | 7 | 6 | 1 | 1 |
| 233 | Instagram post motivation boho | 2 | 4 | 1 | 1 |
| 234 | Instagram post piggy bank | 4 | 3 | 1 | 1 |
| 235 | Instagram post planting trees | 7 | 1 | 1 | 2 |
| 236 | Instagram post purple travel | 4 | 4 | 1 | 1 |
| 237 | Instagram post red fashion | 5 | 9 | 1 | 1 |
| 238 | Instagram post sale notifications | 2 | 3 | 1 | 1 |
| 239 | Instagram post sea adventure | 4 | 6 | 1 | 1 |
| 240 | Instagram post teal realestate | 11 | 4 | 1 | 1 |
| 241 | Instagram instinct post | 30 | 2 | 1 | 1 |
| 242 | Instagram post red blue | 5 | 4 | 1 | 1 |
| 243 | Instagram post bake sale | 5 | 5 | 1 | 1 |
| 244 | Instagram post customer feedback | 9 | 3 | 1 | 1 |
| 245 | Instagram post orange band | 7 | 4 | 1 | 1 |
| 246 | Instagram post planting trees | 9 | 7 | 1 | 1 |
| 247 | Instagram post happy fathers day | 5 | 3 | 1 | 1 |
| 248 | Instagram post blue fashion | 3 | 2 | 1 | 1 |
| 249 | Instagram post black fashion | 4 | 3 | 1 | 1 |
| 250 | Instagram post colorful shapes | 4 | 4 | 1 | 1 |
| 251 | Instagram post fashion sale | 4 | 9 | 1 | 1 |
| 252 | Instagram post father greeting | 5 | 4 | 1 | 1 |
| 253 | Instagram post fathers day | 5 | 4 | 1 | 1 |
| 254 | Instagram post laundry clothes | 6 | 5 | 1 | 1 |
| 255 | Instagram post macaroons bread | 1 | 2 | 1 | 1 |
| 256 | Instagram post mockup thankyou | 3 | 5 | 1 | 1 |
| 257 | Instagram post purple green | 9 | 5 | 1 | 1 |
| 258 | Instagram post summer sale | 4 | 3 | 1 | 1 |
| 259 | Instagram post sunset orange | 5 | 4 | 1 | 1 |
| 260 | Instagram post blue trend | 6 | 5 | 1 | 1 |
| 261 | Instagram post birthday greetings | 3 | 2 | 1 | 1 |
| 262 | Instagram post black orange | 5 | 4 | 1 | 1 |
| 263 | Instagram post breakfast food | 4 | 5 | 1 | 1 |
| 264 | Instagram post business webinar | 5 | 6 | 1 | 1 |
| 265 | Instagram post fathers day | 6 | 4 | 1 | 1 |
| 266 | Instagram post food buffet | 4 | 3 | 1 | 2 |
| 267 | Instagram post grand opening | 3 | 4 | 1 | 1 |
| 268 | Instagram post greeting birthday | 4 | 3 | 1 | 1 |
| 269 | Instagram post halloween greetings | 7 | 3 | 1 | 1 |
| 270 | Instagram post happy birthday | 4 | 5 | 1 | 1 |
| 271 | Instagram post hello october | 2 | 2 | 1 | 1 |
| 272 | Instagram post house sale | 4 | 5 | 1 | 1 |
| 273 | Instagram post lobster food | 4 | 4 | 1 | 1 |
| 274 | Instagram post movie night | 9 | 8 | 1 | 1 |
| 275 | Instagram post music note | 3 | 4 | 1 | 1 |
| 276 | Instagram post note pad | 3 | 2 | 1 | 1 |
| 277 | Instagram post now hiring | 4 | 5 | 1 | 1 |
| 278 | Instagram post number countdown | 5 | 5 | 1 | 1 |
| 279 | Instagram post purple pink | 3 | 6 | 1 | 1 |
| 280 | Instagram post retro style | 9 | 3 | 1 | 1 |
| 281 | Instagram post special menu | 3 | 2 | 1 | 1 |
| 282 | Instagram post steak delivery | 10 | 3 | 1 | 1 |
| 283 | Instagram post sushi restaurant | 8 | 5 | 1 | 1 |
| 284 | Instagram post thank you | 2 | 2 | 1 | 1 |
| 285 | Instagram post vegetables fruits | 4 | 6 | 1 | 1 |
| 286 | Instagram post vegetarian day | 2 | 4 | 1 | 1 |
| 287 | Instagram post yellow green | 5 | 3 | 1 | 1 |
| 288 | Instagram post black orange | 5 | 5 | 1 | 1 |
| 289 | Instagram post blue podcast | 7 | 3 | 1 | 1 |
| 290 | Instagram post christmas sale | 3 | 5 | 1 | 1 |
| 291 | Instagram post earth day | 4 | 4 | 1 | 1 |
| 292 | Instagram post fashion sale | 3 | 4 | 1 | 1 |
| 293 | Instagram post flowers quotes | 7 | 4 | 1 | 1 |
| 294 | Instagram post graduation day | 2 | 3 | 1 | 1 |
| 295 | Instagram post graduation greetings | 1 | 2 | 1 | 1 |
| 296 | Instagram post halloween threat | 6 | 13 | 1 | 1 |
| 297 | Instagram post happy emojis | 2 | 2 | 1 | 1 |
| 298 | Instagram post labor day | 4 | 4 | 1 | 1 |
| 299 | Instagram post merry christmas | 2 | 7 | 1 | 1 |
| 300 | Instagram post pink sale | 5 | 4 | 1 | 1 |
| 301 | Instagram post pink valentines | 3 | 4 | 1 | 1 |
| 302 | Instagram post red fashion | 6 | 3 | 1 | 1 |
| 303 | Instagram post thanksgiving party | 3 | 2 | 1 | 1 |
| 304 | Instagram post travel tourism | 3 | 3 | 1 | 1 |
| 305 | Instagram post valentines sale | 3 | 2 | 1 | 1 |
| 306 | Instagram post winter vibes | 5 | 5 | 1 | 1 |
| 307 | Instagram post birthday celebration | 5 | 2 | 1 | 1 |
| 308 | Instagram post birthday greetings | 4 | 3 | 1 | 1 |
| 309 | Instagram post blue fashion | 10 | 2 | 1 | 1 |
| 310 | Instagram post celestial birthday | 4 | 4 | 1 | 1 |
| 311 | Instagram post cheers newyear | 4 | 2 | 1 | 1 |
| 312 | Instagram post cupcake birthday | 7 | 6 | 1 | 1 |
| 313 | Instagram post earth day | 7 | 5 | 1 | 1 |
| 314 | Instagram post family christmas | 4 | 4 | 1 | 1 |
| 315 | Instagram post fashion sale | 3 | 3 | 1 | 1 |
| 316 | Instagram post happy birthday | 5 | 3 | 1 | 1 |
| 317 | Instagram post hello christmas | 7 | 4 | 1 | 1 |
| 318 | Instagram post hello december | 2 | 12 | 1 | 1 |
| 319 | Instagram post homemade bread | 4 | 5 | 1 | 1 |
| 320 | Instagram post party newyear | 4 | 4 | 1 | 1 |
| 321 | Instagram post purple newyear | 11 | 4 | 1 | 1 |
| 322 | Instagram post recycle compost | 11 | 2 | 1 | 1 |
| 323 | Instagram post self quote | 7 | 4 | 1 | 1 |
| 324 | Instagram post strawberry cake | 5 | 3 | 1 | 1 |
| 325 | Instagram post sunday reminder | 6 | 4 | 1 | 1 |
| 326 | Instagram post sunshine quotes | 3 | 5 | 1 | 1 |
| 327 | Instagram post thksgiving dinner | 6 | 2 | 1 | 1 |
| 328 | Instagram post vibes typography | 4 | 2 | 1 | 1 |
| 329 | Instagram post waffle pancake | 1 | 3 | 1 | 1 |
| 330 | headphone brand product social media instagram | 5 | 3 | 1 | 1 |
| 331 | Instagram post sale clothes | 7 | 5 | 1 | 1 |
| 332 | Instagram ads | 11 | 4 | 1 | 1 |
| 333 | Instagram happy fathers day | 5 | 5 | 1 | 1 |
| 334 | Instagram shoes sale | 1 | 2 | 1 | 1 |
| 335 | Instagram post wedding invitation | 4 | 5 | 1 | 1 |
| 336 | Trip travel adventure polaroid instagram | 1 | 3 | 1 | 1 |
| 337 | Trip memory collage travel adventure polaroid instagram | 4 | 4 | 1 | 1 |
| 338 | Instagram ad art show event school children kids activity event | 2 | 4 | 1 | 1 |
| 339 | Instagram ad class booking vector illustration drawing | 2 | 4 | 1 | 1 |
| 340 | Instagram ad write writting classroom online coursw | 4 | 4 | 1 | 1 |
| 341 | Instagram routine post | 9 | 5 | 1 | 1 |
| 342 | Instagram post black sale | 7 | 3 | 1 | 1 |
| 343 | Instagram post fashion sale | 7 | 4 | 1 | 1 |
| 344 | Instagram post yellow sale | 6 | 3 | 1 | 1 |
| 345 | Instagram post pink fashion | 3 | 8 | 1 | 1 |
