declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"posts": {
"3721-assistant.md": {
	id: "3721-assistant.md";
  slug: "3721-assistant";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"4399-flash-games.md": {
	id: "4399-flash-games.md";
  slug: "4399-flash-games";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"90s-chinese-mv.md": {
	id: "90s-chinese-mv.md";
  slug: "90s-chinese-mv";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"90s-web-design.md": {
	id: "90s-web-design.md";
  slug: "90s-web-design";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"after-school-store.md": {
	id: "after-school-store.md";
  slug: "after-school-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"age-of-empires-1-2.md": {
	id: "age-of-empires-1-2.md";
  slug: "age-of-empires-1-2";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"audio-video-store.mdx": {
	id: "audio-video-store.mdx";
  slug: "audio-video-store";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"bamboo-bed-grass-mat-nap.md": {
	id: "bamboo-bed-grass-mat-nap.md";
  slug: "bamboo-bed-grass-mat-nap";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"bie-shuo-wo-de-yanlei.md": {
	id: "bie-shuo-wo-de-yanlei.md";
  slug: "bie-shuo-wo-de-yanlei";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"broadband-days.md": {
	id: "broadband-days.md";
  slug: "broadband-days";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"call-of-duty-1.md": {
	id: "call-of-duty-1.md";
  slug: "call-of-duty-1";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"chang-huijia-kankan.md": {
	id: "chang-huijia-kankan.md";
  slug: "chang-huijia-kankan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"childhood-cartoons.md": {
	id: "childhood-cartoons.md";
  slug: "childhood-cartoons";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"childhood-spring-festival.mdx": {
	id: "childhood-spring-festival.mdx";
  slug: "childhood-spring-festival";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"computer-viruses-history.md": {
	id: "computer-viruses-history.md";
  slug: "computer-viruses-history";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"contra.md": {
	id: "contra.md";
  slug: "contra";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"counter-strike-1-6.md": {
	id: "counter-strike-1-6.md";
  slug: "counter-strike-1-6";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"crazy-kart.md": {
	id: "crazy-kart.md";
  slug: "crazy-kart";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dahua-westward-journey.md": {
	id: "dahua-westward-journey.md";
  slug: "dahua-westward-journey";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"digital-camera-card-reader.md": {
	id: "digital-camera-card-reader.md";
  slug: "digital-camera-card-reader";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ding-xiang-hua.md": {
	id: "ding-xiang-hua.md";
  slug: "ding-xiang-hua";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"double-dragon.md": {
	id: "double-dragon.md";
  slug: "double-dragon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"download-sites-weird-file-names.md": {
	id: "download-sites-weird-file-names.md";
  slug: "download-sites-weird-file-names";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"downstairs-summer-stools.md": {
	id: "downstairs-summer-stools.md";
  slug: "downstairs-summer-stools";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"dream-westward-journey.md": {
	id: "dream-westward-journey.md";
  slug: "dream-westward-journey";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"electronic-dictionary-learning-machine.md": {
	id: "electronic-dictionary-learning-machine.md";
  slug: "electronic-dictionary-learning-machine";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"email-attachments-first-files.md": {
	id: "email-attachments-first-files.md";
  slug: "email-attachments-first-files";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"first-internet-cafe.md": {
	id: "first-internet-cafe.md";
  slug: "first-internet-cafe";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"first-music-phone-mp4.md": {
	id: "first-music-phone-mp4.md";
  slug: "first-music-phone-mp4";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"flash-music-videos.md": {
	id: "flash-music-videos.md";
  slug: "flash-music-videos";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"flashget.md": {
	id: "flashget.md";
  slug: "flashget";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"floppy-discs-burned-cds.md": {
	id: "floppy-discs-burned-cds.md";
  slug: "floppy-discs-burned-cds";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"forum-signature-avatar.md": {
	id: "forum-signature-avatar.md";
  slug: "forum-signature-avatar";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"game-consoles.md": {
	id: "game-consoles.md";
  slug: "game-consoles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hao123-homepage.md": {
	id: "hao123-homepage.md";
  slug: "hao123-homepage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"hello-world.md": {
	id: "hello-world.md";
  slug: "hello-world";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"heroes-of-might-and-magic.md": {
	id: "heroes-of-might-and-magic.md";
  slug: "heroes-of-might-and-magic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"ice-cream-box-old-popsicles.md": {
	id: "ice-cream-box-old-popsicles.md";
  slug: "ice-cream-box-old-popsicles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jianxia-qingyuan.md": {
	id: "jianxia-qingyuan.md";
  slug: "jianxia-qingyuan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"jin-er-ge-gaoxing.md": {
	id: "jin-er-ge-gaoxing.md";
  slug: "jin-er-ge-gaoxing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kart-rider.md": {
	id: "kart-rider.md";
  slug: "kart-rider";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"kingsoft-software-suite.md": {
	id: "kingsoft-software-suite.md";
  slug: "kingsoft-software-suite";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lan-party-red-alert-cs.md": {
	id: "lan-party-red-alert-cs.md";
  slug: "lan-party-red-alert-cs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"lao-shu-ai-da-mi.md": {
	id: "lao-shu-ai-da-mi.md";
  slug: "lao-shu-ai-da-mi";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"legend-of-mir.md": {
	id: "legend-of-mir.md";
  slug: "legend-of-mir";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"martial-arts-tv-movies.md": {
	id: "martial-arts-tv-movies.md";
  slug: "martial-arts-tv-movies";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"medal-of-honor.md": {
	id: "medal-of-honor.md";
  slug: "medal-of-honor";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"miracle-mu.md": {
	id: "miracle-mu.md";
  slug: "miracle-mu";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"mosquito-net-floral-water.md": {
	id: "mosquito-net-floral-water.md";
  slug: "mosquito-net-floral-water";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"msn-signature-status.md": {
	id: "msn-signature-status.md";
  slug: "msn-signature-status";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"netants.md": {
	id: "netants.md";
  slug: "netants";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"netscape-navigator.md": {
	id: "netscape-navigator.md";
  slug: "netscape-navigator";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"newsstand-magazines.md": {
	id: "newsstand-magazines.md";
  slug: "newsstand-magazines";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"nokia-keypad-typing.md": {
	id: "nokia-keypad-typing.md";
  slug: "nokia-keypad-typing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"old-computer.md": {
	id: "old-computer.md";
  slug: "old-computer";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"old-music.mdx": {
	id: "old-music.mdx";
  slug: "old-music";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"old-tv.md": {
	id: "old-tv.md";
  slug: "old-tv";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"online-games.md": {
	id: "online-games.md";
  slug: "online-games";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"palm-fan-well-watermelon.md": {
	id: "palm-fan-well-watermelon.md";
  slug: "palm-fan-well-watermelon";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"pao-pao-tang.md": {
	id: "pao-pao-tang.md";
  slug: "pao-pao-tang";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"phone-booth-ic-card.md": {
	id: "phone-booth-ic-card.md";
  slug: "phone-booth-ic-card";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"post-2000-music.md": {
	id: "post-2000-music.md";
  slug: "post-2000-music";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"power-outage-night.md": {
	id: "power-outage-night.md";
  slug: "power-outage-night";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"print-shop-copy-files.md": {
	id: "print-shop-copy-files.md";
  slug: "print-shop-copy-files";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"qianqian-listen-mp3.md": {
	id: "qianqian-listen-mp3.md";
  slug: "qianqian-listen-mp3";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"qq-avatar-flash-message-alerts.md": {
	id: "qq-avatar-flash-message-alerts.md";
  slug: "qq-avatar-flash-message-alerts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"qq-zone-homepage.md": {
	id: "qq-zone-homepage.md";
  slug: "qq-zone-homepage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"red-alert-1-2.md": {
	id: "red-alert-1-2.md";
  slug: "red-alert-1-2";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"repeater-and-english-tapes.md": {
	id: "repeater-and-english-tapes.md";
  slug: "repeater-and-english-tapes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"reset-button-and-freeze.md": {
	id: "reset-button-and-freeze.md";
  slug: "reset-button-and-freeze";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"retro-computer-software.md": {
	id: "retro-computer-software.md";
  slug: "retro-computer-software";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"retro-games.md": {
	id: "retro-games.md";
  slug: "retro-games";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"return-to-castle-wolfenstein.md": {
	id: "return-to-castle-wolfenstein.md";
  slug: "return-to-castle-wolfenstein";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"scanner-and-photo-digitizing.md": {
	id: "scanner-and-photo-digitizing.md";
  slug: "scanner-and-photo-digitizing";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"school-computer-room.md": {
	id: "school-computer-room.md";
  slug: "school-computer-room";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"screensavers-and-standby.md": {
	id: "screensavers-and-standby.md";
  slug: "screensavers-and-standby";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"shanda-network.md": {
	id: "shanda-network.md";
  slug: "shanda-network";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"single-player-games.md": {
	id: "single-player-games.md";
  slug: "single-player-games";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"spring-festival-gala-memories.md": {
	id: "spring-festival-gala-memories.md";
  slug: "spring-festival-gala-memories";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stationery-shop-glass-counter.md": {
	id: "stationery-shop-glass-counter.md";
  slug: "stationery-shop-glass-counter";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"stone-age-online.md": {
	id: "stone-age-online.md";
  slug: "stone-age-online";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"storm-player-era.md": {
	id: "storm-player-era.md";
  slug: "storm-player-era";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"summer-mat-electric-fan.md": {
	id: "summer-mat-electric-fan.md";
  slug: "summer-mat-electric-fan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"super-star-she.md": {
	id: "super-star-she.md";
  slug: "super-star-she";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"symbian-themes-ringtones.md": {
	id: "symbian-themes-ringtones.md";
  slug: "symbian-themes-ringtones";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"system-sounds-startup-chimes.md": {
	id: "system-sounds-startup-chimes.md";
  slug: "system-sounds-startup-chimes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tianjiao-online.md": {
	id: "tianjiao-online.md";
  slug: "tianjiao-online";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tieba-level-titles.md": {
	id: "tieba-level-titles.md";
  slug: "tieba-level-titles";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"tray-icons-little-software.md": {
	id: "tray-icons-little-software.md";
  slug: "tray-icons-little-software";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"usb-drive-replaced-floppy.md": {
	id: "usb-drive-replaced-floppy.md";
  slug: "usb-drive-replaced-floppy";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"vcd-era.md": {
	id: "vcd-era.md";
  slug: "vcd-era";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"webcam-first-video-chat.md": {
	id: "webcam-first-video-chat.md";
  slug: "webcam-first-video-chat";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"weekend-dvd-rental.md": {
	id: "weekend-dvd-rental.md";
  slug: "weekend-dvd-rental";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"wei-le-shei.md": {
	id: "wei-le-shei.md";
  slug: "wei-le-shei";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"winrar-and-archive-files.md": {
	id: "winrar-and-archive-files.md";
  slug: "winrar-and-archive-files";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"xp-desktop-customization.md": {
	id: "xp-desktop-customization.md";
  slug: "xp-desktop-customization";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"xunlei-5.md": {
	id: "xunlei-5.md";
  slug: "xunlei-5";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"yahoo-china.md": {
	id: "yahoo-china.md";
  slug: "yahoo-china";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zheng-tu.md": {
	id: "zheng-tu.md";
  slug: "zheng-tu";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"zhu-ni-pingan.md": {
	id: "zhu-ni-pingan.md";
  slug: "zhu-ni-pingan";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
