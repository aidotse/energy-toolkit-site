<script lang="ts">
	import * as m from '$paraglide/messages';
	import type { FrameworkStatus } from '$lib/data/frameworks';
	import type { ImplementationStatus } from '$lib/data/implementations';

	type Status = FrameworkStatus | ImplementationStatus;

	let { status }: { status: Status } = $props();

	const labels: Record<Status, () => string> = {
		stable: m.status_stable,
		preview: m.status_preview,
		planned: m.status_planned,
		live: m.status_live,
		staging: m.status_staging,
		archived: m.status_archived
	};

	const styles: Record<Status, string> = {
		stable: 'bg-emerald-100 text-emerald-800',
		preview: 'bg-amber-100 text-amber-800',
		planned: 'bg-slate-200 text-slate-700',
		live: 'bg-emerald-100 text-emerald-800',
		staging: 'bg-amber-100 text-amber-800',
		archived: 'bg-slate-200 text-slate-600'
	};
</script>

<span class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium {styles[status]}">
	{labels[status]()}
</span>
