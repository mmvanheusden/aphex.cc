<script lang="ts">
	import { authClient } from "$lib/client/auth_client";
	const session = authClient.useSession();
	import Icon from "@iconify/svelte";
</script>

<section class="flex w-full flex-col items-center justify-center">
	<h1 class="font-big text-3xl font-extrabold sm:text-4xl">Login</h1>
	<div class="mx-auto py-10">
		<div>
			{#if $session.data}
				<div>
					<p>
						Logged in as: {$session.data.user.name}
					</p>
					<button
						class="btn bg-[#FD4B2D] btn-lg"
						onclick={async () => {
							await authClient.signOut({
								disableRedirect: true,
							});
						}}
					>
						Sign Out
					</button>
				</div>
			{:else}
				<button
					class="btn bg-[#FD4B2D] btn-lg"
					onclick={async () => {
						await authClient.signIn.social({
							callbackURL: "/login",
							provider: "oauth",
						});
					}}
				>
					Login with authentik<Icon icon="cbi:authentik" class="text-3xl" />
				</button>
			{/if}
		</div>
	</div>
</section>
