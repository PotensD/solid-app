import { Show } from "solid-js";
import { FormError } from "solid-start";
import {
	createServerAction$,
	createServerData$,
	redirect,
} from "solid-start/server";

function EnrollmentPage(params: {
	hello: { huhu: string } | undefined | null;
}) {
	const data = createServerData$(
		async ([, id], { request }) => {
			return {
				a: Math.random().toString(36).substring(7),
			};
		},
		{ key: () => ["students", 2] },
	);

	const [enrolling, { Form }] = createServerAction$(
		async (form: FormData, { request }) => {
			const id = form.get("id");
			throw new Error("sdfhskjd", {
				cause: "Dfdsfd",
			});
		},
		{
			invalidate: ["students"],
		},
	);

	console.log(enrolling.error);

	if (params.hello) {
		console.log(params.hello);
	}

	const onSubmit = (e: Event) => {
		e.preventDefault();
		// enroll({
		// 	id: 2,
		// 	subject: "Defense against the Dark Arts",
		// });
	};

	return (
		<Form>
			<input type="number" name="id" />
			<input
				type="hidden"
				name="subject"
				value="Defense against the Dark Arts"
			/>
			<Show when={data.loading}>
				<div>Loading...</div>
			</Show>
			<p id="phl2sk">{data.latest?.a}</p>
			<button type="submit" disabled={enrolling.pending}>
				Enroll
			</button>

			<Show when={enrolling.error}>
				<div>{enrolling.error.message}</div>
				<button onClick={() => enrolling.retry()}>Retry</button>
			</Show>

			<Show when={params.hello}>{(nana) => nana().huhu}</Show>
		</Form>
	);
}

export default function ServerAction() {
	return <EnrollmentPage hello={undefined} />;
}
