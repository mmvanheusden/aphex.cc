<script lang="ts">
	import { page } from "$app/state";
	import favicon from "$lib/assets/favicon.svg";
	import Navbar from "$lib/components/Navbar.svelte";
	import { type NavbarItem, navbars, type NavbarVariant } from "$lib/navbars";
	import { Neko } from "@yuna0x0/svelte-neko";

	import type { LayoutProps } from "./$types";

	import "./layout.css";

	const variant = $derived((page.data.navbarVariant as NavbarVariant) ?? "default");
	const navbarItems = $derived(navbars[variant] as NavbarItem[]);

	let { children }: LayoutProps = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Neko nekoImage="oneko.gif" toggleTrackingOnClick={true} />

<section>
	<div
		class="flex w-full flex-col items-center justify-center gap-2 px-4 pt-4 sm:flex-row sm:px-0"
	>
		<enhanced:img
			src="/static/mate.webp"
			alt="Club-Mate bottle"
			class="w-12 hover:animate-spin sm:w-15"
		>
		</enhanced:img>
		<div class="mt-2 sm:mt-9">
			<header>
				<h1 class="text-center font-big text-4xl font-extrabold sm:text-6xl">Maarten</h1>
				<h2 class="text-center font-big text-xl font-medium sm:text-2xl">
					Software Developer
				</h2>
			</header>
			<Navbar items={navbarItems} />
		</div>
	</div>
</section>

<main class="mx-auto w-full max-w-6xl px-4 py-6 sm:px-8 sm:py-10 lg:px-16">
	{@render children()}
</main>
