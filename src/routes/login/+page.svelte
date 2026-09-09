<section class="flex w-full flex-col items-center justify-center">
	<h1 class="font-big text-3xl font-extrabold sm:text-4xl">Login</h1>
	<div class="mx-auto py-10">
		<form class="flex flex-col space-y-5" method="POST">
			<div>
				<label class="font-big" for="username">Username</label>
				<input id="username" type="text" name="username" class="input" />
			</div>

			<div>
				<label class="font-big" for="password">Password</label>
				<input id="password" type="password" name="password" class="input" />
			</div>

			<button type="submit" class="btn btn-lg btn-primary">Login</button>
		</form>
	</div>
</section>
