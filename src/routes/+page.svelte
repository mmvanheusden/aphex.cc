<script lang="ts">
	import ProjectCard from "$lib/client/components/ProjectCard.svelte";
	import dayjs from "dayjs";
	import utc from "dayjs/plugin/utc";
	import "dayjs/locale/nl";

	dayjs.locale("nl");
	dayjs.extend(utc);

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<section class="flex rotate-2 flex-col items-end justify-end whitespace-pre-wrap">
	<p class="font-big text-3xl font-semibold">
		Is Maarten nu op het Science Park? <b
			class={`text-6xl font-extrabold ${data.science_park.present ? "text-green-500" : "text-red-500"}`}
			>{data.science_park.present ? "JA!" : "NEE"}!</b
		>
	</p>
	<p class="text-xs">
		Sinds {dayjs.utc(data.science_park.last_changed).local().format("D MMM[ ]HH:mm:ss")}
	</p>
</section>

<section class="mt-6 sm:mt-8">
	<h1 class="font-big text-3xl font-extrabold sm:text-4xl">About me</h1>
	<div class="mx-2 mt-2 text-base sm:text-lg">
		My name is Maarten and I am {data.age} years old. I like coding and staying active.<br />
		I'm a Computer Science student in Utrecht, the Netherlands.<br />
		I like to teach others subjects in IT, and I enjoy programming in my free time. I like Rust, but
		I am proficient in other languages as well.<br />
		I have a special interest in open-source software, digital sovereignty, and online privacy.
		<br />

		In my free time, I like to bicycle(MTB and race), and donate blood.
	</div>
</section>

<section class="mt-8">
	<h1 class="font-big text-3xl font-extrabold sm:text-4xl">Projects</h1>
	<div class="mx-2 mt-2">
		<div role="list" class="flex flex-col gap-4">
			{#each data.projects as project (project.title)}
				<ProjectCard {project} />
			{/each}
		</div>
	</div>
</section>

<section
	class="mx-10 mt-4 flex flex-row justify-center gap-4 max-sm:mx-2 max-sm:grid max-sm:grid-cols-4 max-sm:gap-3"
>
	{#each data.buttons as { alt, file, href } (file)}
		{#if href}
			<div class="w-full transition-transform hover:-translate-y-1">
				<a {href} title={alt}>
					<enhanced:img src={`/buttons/${file}`} {alt} class="w-full" />
				</a>
			</div>
		{:else}
			<enhanced:img src={`/buttons/${file}`} {alt} class="w-full" />
		{/if}
	{/each}
</section>
