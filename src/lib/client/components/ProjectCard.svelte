<script lang="ts">
	import { compile } from "mdsvex";

	export type Project = {
		button: {
			alt: string;
			text: string;
			url: string;
		};
		description: string;
		image?: {
			alt: string;
			src: string;
			width?: number;
		};
		title: string;
	};

	let { class: className, project }: { class?: string; project: Project } = $props();

	const renderedProjectDescription = await compile(project.description);
</script>

<div
	role="listitem"
	class={`w-full rounded-xl bg-base-200 font-big shadow-sm card-md ${className}`}
>
	<div class="p-5">
		<h2 class="mb-2 text-2xl font-bold sm:text-3xl">{project.title}</h2>
		<div class={project.image ? "flex flex-col gap-4 md:flex-row md:gap-5" : undefined}>
			<div>
				<p
					class="text-lg text-wrap sm:text-xl [&_a]:underline [&_a]:hover:cursor-pointer [&_a]:hover:text-blue-600 [&_li]:before:content-['*_']"
				>
					{@html renderedProjectDescription?.code ?? ""}
				</p>
			</div>
			{#if project.image}
				<enhanced:img
					class="mx-auto max-h-120 w-full max-w-full md:ml-auto md:max-w-[48%]"
					style:width={project.image.width ? `${project.image.width}px` : undefined}
					src={project.image.src}
					alt={project.image.alt}
				/>
			{/if}
		</div>
		<div class="mt-2 flex w-full justify-center md:justify-end">
			<a href={project.button.url} rel="external" title={project.button.alt}>
				<button
					class="btn border-2 border-yellow-900 bg-yellow-300 px-6 text-xl text-black sm:px-10 sm:text-2xl"
					tabindex="-1">{project.button.text}</button
				>
			</a>
		</div>
	</div>
</div>
