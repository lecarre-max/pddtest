// lib/keywords.ts

export type Realm = 'fashion' | 'home' | 'character';

export interface ColorOption {
  name: string;
  hex: string;
  cn: string;
  border?: string;
}

export interface ChipGroup {
  label: string;
  type: 'cat' | 'style' | 'char';
  items: string[];
}

export const FASHION_GROUPS: ChipGroup[] = [
  {
    label: 'Clothing Type',
    type: 'cat',
    items: [
      'T-Shirt','Dress','Bodysuit','Underwear','Scarf','Coat','Jeans','Shorts',
      'Bikini','Shoes','Bag','Gloves','Hat','Jewelry','Loafers','Heels','Socks',
      'Ballet Flats','Skirt','Cardigan','Corset','Nightwear','Trench Coat','Blazer','Jumpsuit',
    ],
  },
  {
    label: 'Aesthetic Style',
    type: 'style',
    items: [
      'Cottagecore','Dark Academia','Coquette','Y2K','Fairycore','Goth','Balletcore',
      'Vintage','Minimal','Streetwear','Preppy','Boho','Kawaii','Lolita','Baroque',
      'Clean Girl','Old Money','Mob Wife','Grunge','Mermaidcore','Witchcore','Royalcore',
    ],
  },
];

export const HOME_GROUPS: ChipGroup[] = [
  {
    label: 'Room',
    type: 'cat',
    items: ['Bedroom','Bathroom','Kitchen','Living Room','Study / Office','Balcony / Garden','Nursery','Entryway'],
  },
  {
    label: 'Item Type',
    type: 'cat',
    items: [
      'Bedding / Sheets','Pillow / Cushion','Curtains','Rug','Lamp','Wall Art','Vase',
      'Mug / Cup','Towel','Soap Dispenser','Storage Box','Candle','Mirror','Plush Toy',
      'Diffuser','Tray','Flower Pot','Clock','Photo Frame',
    ],
  },
  {
    label: 'Home Style',
    type: 'style',
    items: ['Japandi','Cottagecore','Maximalist','Minimalist','French Vintage','Kawaii','Boho','Industrial','Fairytale','Dark Moody','Pastel','Baroque'],
  },
];

export const CHARACTER_GROUPS: ChipGroup[] = [
  {
    label: '🏰 Disney',
    type: 'char',
    items: [
      'Mickey & Minnie','Cinderella','Ariel','Belle','Rapunzel','Sleeping Beauty',
      'Snow White','Elsa & Anna','Moana','Encanto','Stitch','Winnie the Pooh',
      'Dumbo','Bambi','Alice in Wonderland','Tinker Bell',
    ],
  },
  {
    label: '🎬 Pixar',
    type: 'char',
    items: ['Toy Story','Finding Nemo','The Incredibles','WALL-E','Up','Inside Out','Coco','Turning Red','Monsters Inc','Brave / Merida','Elemental'],
  },
  {
    label: '🎀 Sanrio',
    type: 'char',
    items: [
      'Hello Kitty','My Melody','Kuromi','Cinnamoroll','Pompompurin','Pochacco',
      'Badtz-Maru','Little Twin Stars','Gudetama','Keroppi','Hangyodon','Tuxedo Sam','Aggretsuko',
    ],
  },
];

export const COLORS: ColorOption[] = [
  { name:'Black', hex:'#1a1a1a', cn:'黑色' },
  { name:'White', hex:'#f8f8f0', cn:'白色', border:'#ccc' },
  { name:'Ivory', hex:'#f5f0e0', cn:'奶油色', border:'#ccc' },
  { name:'Beige', hex:'#d4b896', cn:'米色' },
  { name:'Dusty Pink', hex:'#e8a9a0', cn:'粉红色' },
  { name:'Hot Pink', hex:'#e91e8c', cn:'玫红色' },
  { name:'Burgundy', hex:'#6d1f2e', cn:'酒红色' },
  { name:'Red', hex:'#c0392b', cn:'红色' },
  { name:'Coral', hex:'#e8735a', cn:'珊瑚色' },
  { name:'Orange', hex:'#e67e22', cn:'橙色' },
  { name:'Mustard', hex:'#d4a017', cn:'芥末黄' },
  { name:'Yellow', hex:'#f7dc6f', cn:'黄色' },
  { name:'Mint', hex:'#a8e6cf', cn:'薄荷绿' },
  { name:'Sage', hex:'#87a878', cn:'灰绿色' },
  { name:'Forest', hex:'#2d6a4f', cn:'墨绿色' },
  { name:'Baby Blue', hex:'#aec6cf', cn:'淡蓝色' },
  { name:'Cobalt', hex:'#2c5282', cn:'深蓝色' },
  { name:'Navy', hex:'#1a2744', cn:'藏青色' },
  { name:'Lavender', hex:'#c9b1ff', cn:'薰衣草紫' },
  { name:'Purple', hex:'#7b2d8b', cn:'紫色' },
  { name:'Lilac', hex:'#d4b8e0', cn:'淡紫色' },
  { name:'Brown', hex:'#795548', cn:'棕色' },
  { name:'Camel', hex:'#c19a6b', cn:'驼色' },
  { name:'Grey', hex:'#9e9e9e', cn:'灰色' },
  { name:'Gold', hex:'#d4a017', cn:'金色' },
  { name:'Silver', hex:'#b0bec5', cn:'银色' },
];

export const KEY_MAP: Record<string, string> = {
  'T-Shirt':'短袖T恤','Dress':'连衣裙','Bodysuit':'连体衣','Underwear':'内衣内裤',
  'Scarf':'围巾','Coat':'外套大衣','Jeans':'牛仔裤','Shorts':'短裤',
  'Bikini':'比基尼泳衣','Shoes':'鞋子','Bag':'包包','Gloves':'手套',
  'Hat':'帽子','Jewelry':'首饰','Loafers':'乐福鞋','Heels':'高跟鞋',
  'Socks':'袜子','Ballet Flats':'芭蕾平底鞋','Skirt':'半身裙',
  'Cardigan':'开衫毛衣','Corset':'束身衣马甲','Nightwear':'睡衣家居服',
  'Trench Coat':'风衣外套','Blazer':'西装外套','Jumpsuit':'连体裤',
  'Bedroom':'卧室','Bathroom':'浴室卫生间','Kitchen':'厨房',
  'Living Room':'客厅','Study / Office':'书房办公室',
  'Balcony / Garden':'阳台花园','Nursery':'婴儿房儿童房','Entryway':'玄关',
  'Bedding / Sheets':'床上用品四件套','Pillow / Cushion':'抱枕靠垫',
  'Curtains':'窗帘','Rug':'地毯','Lamp':'台灯落地灯','Wall Art':'装饰画',
  'Vase':'花瓶','Mug / Cup':'马克杯','Towel':'毛巾浴巾',
  'Soap Dispenser':'洗手液瓶皂液器','Storage Box':'收纳盒','Candle':'香薰蜡烛',
  'Mirror':'镜子','Plush Toy':'毛绒玩具','Diffuser':'香薰扩散器',
  'Tray':'托盘','Flower Pot':'花盆','Clock':'挂钟','Photo Frame':'相框',
  'Cottagecore':'田园风碎花','Dark Academia':'学院风复古','Coquette':'可爱少女风丝带',
  'Y2K':'Y2K千禧风','Fairycore':'仙女风','Goth':'哥特暗黑风',
  'Balletcore':'芭蕾风','Vintage':'复古vintage风',
  'Minimal':'简约极简风','Streetwear':'街头嘻哈风','Preppy':'学院风preppy',
  'Boho':'波西米亚风','Kawaii':'可爱卡哇伊风','Lolita':'洛丽塔',
  'Baroque':'宫廷复古巴洛克风','Clean Girl':'奶油肤色简洁穿搭',
  'Old Money':'贵族感复古穿搭','Mob Wife':'名媛皮草风','Grunge':'朋克grunge风',
  'Mermaidcore':'美人鱼风','Witchcore':'女巫神秘风','Royalcore':'宫廷皇室风',
  'Japandi':'侘寂风日式','Maximalist':'华丽繁复风','Minimalist':'极简北欧风',
  'French Vintage':'法式复古','Fairytale':'童话风','Dark Moody':'暗黑氛围感',
  'Pastel':'马卡龙莫兰迪色','Industrial':'工业loft风',
  'Mickey & Minnie':'米奇米妮','Cinderella':'灰姑娘','Ariel':'小美人鱼爱丽儿',
  'Belle':'美女与野兽贝儿','Rapunzel':'长发公主乐佩','Sleeping Beauty':'睡美人奥罗拉',
  'Snow White':'白雪公主','Elsa & Anna':'冰雪奇缘爱莎安娜','Moana':'海洋奇缘莫阿娜',
  'Encanto':'魔法满屋','Stitch':'星际宝贝史迪仔','Winnie the Pooh':'小熊维尼',
  'Dumbo':'小飞象','Bambi':'小鹿斑比','Alice in Wonderland':'爱丽丝梦游仙境',
  'Tinker Bell':'小叮当','Toy Story':'玩具总动员','Finding Nemo':'海底总动员',
  'The Incredibles':'超人总动员','WALL-E':'机器人总动员WALL-E',
  'Up':'飞屋环游记','Inside Out':'头脑特工队','Coco':'寻梦环游记可可',
  'Turning Red':'青春变形记小美','Monsters Inc':'怪兽电力公司',
  'Brave / Merida':'勇敢传说','Elemental':'元素方城市',
  'Hello Kitty':'HelloKitty凯蒂猫','My Melody':'My Melody美乐蒂',
  'Kuromi':'Kuromi酷洛米','Cinnamoroll':'玉桂狗',
  'Pompompurin':'布丁狗Pompompurin','Pochacco':'Pochacco帕恰狗',
  'Badtz-Maru':'酷企鹅','Little Twin Stars':'双子星KiKiLaLa',
  'Gudetama':'蛋黄哥','Keroppi':'青蛙可洛比','Hangyodon':'人魚汉顿',
  'Tuxedo Sam':'小企鹅山姆','Aggretsuko':'烈怒熊猫',
};

export const INSPO_MAP: Record<string, string> = {
  'taylor swift':'泰勒斯威夫特风格','zendaya':'赞达亚穿搭','bridgerton':'布里奇顿宫廷风',
  'sailor moon':'美少女战士','euphoria':'euphoria欧美妆造','korean':'韩系穿搭',
  'japanese':'日系穿搭','french':'法式穿搭','rihanna':'蕾哈娜风格',
  'beyonce':'碧昂斯风格','blackpink':'blackpink同款','twice':'twice同款','kpop':'韩系kpop风',
};

export function toCN(val: string): string {
  return KEY_MAP[val] || val;
}

export function generateKeywords(params: {
  cats: string[]; styles: string[]; chars: string[];
  colors: string[]; inspo: string; details: string;
}): { label: string; keyword: string; tip: string }[] {
  const { cats, styles, chars, colors, inspo } = params;
  const catsCN = cats.map(toCN).filter(Boolean);
  const stylesCN = styles.map(toCN).filter(Boolean);
  const charsCN = chars.map(toCN).filter(Boolean);
  const inspoCN = inspo ? (INSPO_MAP[inspo.toLowerCase().trim()] || inspo) : '';

  const results: { label: string; keyword: string; tip: string }[] = [];

  const kw1 = [charsCN[0], catsCN[0], stylesCN[0], colors[0], inspoCN].filter(Boolean).join(' ');
  if (kw1) results.push({ label: 'Focused Search', keyword: kw1, tip: 'Best starting point' });

  const kw2 = [charsCN[1]||charsCN[0], catsCN.slice(0,2).join(' '), stylesCN[1]||stylesCN[0], colors[1]||colors[0]].filter(Boolean).join(' ');
  if (kw2 && kw2 !== kw1) results.push({ label: 'Broader Search', keyword: kw2, tip: 'More variety in results' });

  const kw3 = [stylesCN[0], catsCN[0], colors[0], '女款'].filter(Boolean).join(' ');
  if (kw3 && kw3 !== kw1) results.push({ label: 'Style Discovery', keyword: kw3, tip: 'Browse the aesthetic' });

  const base = catsCN[0] || charsCN[0] || stylesCN[0] || '时尚好物';
  results.push({ label: 'Quality Filter', keyword: `${base} 高品质 包邮`, tip: 'With free shipping' });

  return results;
}
