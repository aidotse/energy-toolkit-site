<script lang="ts">
	import * as m from '$paraglide/messages';
</script>

<footer class="bg-brand-navy text-white/70">
	<div class="mx-auto max-w-6xl px-6 py-12">
		<div class="grid gap-8 sm:grid-cols-3">
			<div>
				<h3 class="mb-3 font-display font-bold text-white">Energy Toolkit</h3>
				<p class="text-sm leading-relaxed">
					{m.footer_tagline()}
				</p>
			</div>
			<div>
				<h4 class="mb-3 text-sm font-bold uppercase tracking-wider text-white/50">
					{m.footer_section_tools()}
				</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/tools/demand" class="hover:text-white transition-colors">{m.tool_demand_name()}</a></li>
					<li><a href="/tools/generation" class="hover:text-white transition-colors">{m.tool_generation_name()}</a></li>
					<li><a href="/getting-started" class="hover:text-white transition-colors">{m.nav_getting_started()}</a></li>
					<li><a href="/projects" class="hover:text-white transition-colors">{m.nav_projects()}</a></li>
				</ul>
			</div>
			<div>
				<h4 class="mb-3 text-sm font-bold uppercase tracking-wider text-white/50">
					{m.footer_section_projects()}
				</h4>
				<ul class="space-y-2 text-sm">
					<li>
						<a href="https://staging.behovskartan.se" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
							Behovskartan
						</a>
					</li>
					<li>
						<a href="https://vgr.toolkit.energy" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
							PyPSA-VGR
						</a>
					</li>
					<li>
						<a href="https://github.com/aidotse/energy-toolkit-demand" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
							energy-toolkit-demand
						</a>
					</li>
					<li>
						<a href="https://github.com/aidotse/energy-toolkit-site" target="_blank" rel="noopener noreferrer" class="hover:text-white transition-colors">
							energy-toolkit-site
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="mt-10 border-t border-white/10 pt-6 text-center text-xs text-white/40">
			<p>{m.footer_builtby()}</p>
		</div>
	</div>
</footer>
