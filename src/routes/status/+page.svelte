<script lang="ts">
	import { authClient } from "$lib/client/auth_client";

	import type { PageData } from "./$types";

	const session = authClient.useSession();

	let { data }: { data: PageData } = $props();
</script>

{#if $session.data}
	<section class="mt-6 sm:mt-8">
		<h1 class="font-big text-3xl font-extrabold sm:text-4xl">Position</h1>
		<div class="mx-2 mt-2 text-base sm:text-lg">
			<div>
				<p>
					Logged in as: {$session.data.user.name}
				</p>

				Maarten is currently at: {data.position.zone}
				As of <b>{data.position.lastSeen}</b>,
			</div>
		</div>
	</section>
{:else}
	Not logged in! Please log in.
{/if}
