import * as vscode from "vscode";

/**
 * 支持的语言类型
 */
export type SupportedLocale = "en" | "zh-cn";

/**
 * 获取当前 VS Code 显示语言对应的内部语言标识
 */
export function getCurrentLocale(): SupportedLocale {
	const locale = vscode.env.language?.toLowerCase() ?? "en";
	if (locale === "zh-cn" || locale === "zh-tw" || locale === "zh-hk" || locale.startsWith("zh")) {
		return "zh-cn";
	}
	return "en";
}

/**
 * 判断当前是否为中文环境
 */
export function isZh(): boolean {
	return getCurrentLocale() === "zh-cn";
}

/**
 * 根据当前语言返回对应的文本
 * @param en 英文文本
 * @param zh 中文文本
 * @returns 当前语言对应的文本
 */
export function t(en: string, zh: string): string {
	return isZh() ? zh : en;
}

/* ============================================================
 * 集中管理所有 UI 文本，按模块分组
 * ============================================================ */

/** 通用 */
export const I18N = {
	// 通用操作
	cancel: () => t("Cancel", "取消"),
	save: () => t("Save", "保存"),
	delete: () => t("Delete", "删除"),
	edit: () => t("Edit", "编辑"),
	add: () => t("Add", "添加"),
	refresh: () => t("Refresh", "刷新"),
	export: () => t("Export", "导出"),
	import: () => t("Import", "导入"),
	yes: () => t("Yes", "是"),
	no: () => t("No", "否"),
	none: () => t("None", "无"),
	close: () => t("Close", "关闭"),
	loading: () => t("Loading...", "加载中..."),
	noData: () => t("No data", "暂无数据"),

	// API Key 相关
	apiKey: () => t("API Key", "API 密钥"),
	apiKeySaved: () => t("OAI Compatible API key saved.", "OAI Compatible API 密钥已保存。"),
	apiKeyCleared: () => t("OAI Compatible API key cleared.", "OAI Compatible API 密钥已清除。"),
	apiKeyMissing: () => t("OAI Compatible API key not found", "未找到 OAI Compatible API 密钥"),
	apiKeyForProvider: (provider: string) =>
		t(`API key for ${provider} saved.`, `${provider} 的 API 密钥已保存。`),
	apiKeyForProviderCleared: (provider: string) =>
		t(`API key for ${provider} cleared.`, `${provider} 的 API 密钥已清除。`),
	enterApiKey: (provider?: string) =>
		provider
			? t(`Enter API key for ${provider}`, `输入 ${provider} 的 API 密钥`)
			: t("Enter your OAI Compatible API key", "输入您的 OAI Compatible API 密钥"),
	updateApiKey: (provider?: string) =>
		provider
			? t(`Update API key for ${provider}`, `更新 ${provider} 的 API 密钥`)
			: t("Update your OAI Compatible API key", "更新您的 OAI Compatible API 密钥"),
	enterApiKeyForProvider: (provider: string) =>
		t(`Enter your OAI Compatible API key for ${provider}`, `输入 ${provider} 的 OAI Compatible API 密钥`),

	// 提供商相关
	provider: () => t("Provider", "提供商"),
	providerId: () => t("Provider ID", "提供商 ID"),
	selectProvider: () => t("Select Provider", "选择提供商"),
	providerAdded: (name: string) => t(`Provider ${name} has been added.`, `提供商 ${name} 已添加。`),
	providerUpdated: (name: string) => t(`Provider ${name} has been updated.`, `提供商 ${name} 已更新。`),
	providerDeleted: (name: string) =>
		t(`Provider ${name} and all its models have been deleted.`, `提供商 ${name} 及其所有模型已删除。`),
	noProviders: () => t("No providers", "暂无提供商"),
	noProvidersFound: () =>
		t(
			"No providers found in oaicopilot.models configuration. Please configure models first.",
			"在 oaicopilot.models 配置中未找到提供商，请先配置模型。"
		),
	providerIdRequired: () => t("Provider ID is required.", "提供商 ID 不能为空。"),
	deleteProviderConfirm: (name: string) =>
		t(
			`Are you sure you want to delete provider ${name} and all its models?`,
			`确定要删除提供商 ${name} 及其所有模型吗？`
		),

	// 模型相关
	model: () => t("Model", "模型"),
	modelId: () => t("Model ID", "模型 ID"),
	modelIdRequired: () => t("Model ID is required.", "模型 ID 不能为空。"),
	providerIdRequired2: () => t("Provider ID is required.", "提供商 ID 不能为空。"),
	modelAdded: (id: string) => t(`Model ${id} has been added.`, `模型 ${id} 已添加。`),
	modelUpdated: (id: string) => t(`Model ${id} has been updated.`, `模型 ${id} 已更新。`),
	modelDeleted: (id: string) => t(`Model ${id} has been deleted.`, `模型 ${id} 已删除。`),
	modelExists: (id: string) => t(`Model ${id} already exists.`, `模型 ${id} 已存在。`),
	noModels: () => t("No models", "暂无模型"),
	deleteModelConfirm: (id: string) =>
		t(`Are you sure you want to delete model ${id}?`, `确定要删除模型 ${id} 吗？`),
	addNewModel: () => t("Add New Model", "添加新模型"),
	editModel: (id: string) => t(`Edit Model: ${id}`, `编辑模型：${id}`),
	saveModel: () => t("Save Model", "保存模型"),

	// 配置相关
	configSaved: () =>
		t(
			"OAI Compatible base URL, Delay, Retry and API Key have been saved to global settings.",
			"OAI Compatible 基础 URL、延迟、重试和 API 密钥已保存到全局设置。"
	),
	configExported: (path: string) => t(`Configuration exported to ${path}`, `配置已导出到 ${path}`),
	configExportCancelled: () => t("Export configuration cancelled.", "导出配置已取消。"),
	configImportCancelled: () => t("Import configuration cancelled.", "导入配置已取消。"),
	configImported: () => t("Configuration imported successfully.", "配置导入成功。"),
	exportFailed: (msg: string) => t(`Failed to export configuration: ${msg}`, `导出配置失败：${msg}`),
	importFailed: (msg: string) => t(`Failed to import configuration: ${msg}`, `导入配置失败：${msg}`),
	invalidConfigFile: () =>
		t("Invalid configuration file: models must be an array", "配置文件格式无效：models 必须为数组"),

	// 错误相关
	errorUnexpected: (type: string) =>
		t(`Unexpected error while handling configuration message[${type}].`, `处理配置消息[${type}]时发生意外错误。`),
	errorUnknown: () => t("Unknown error", "未知错误"),

	// Git 提交相关
	commitGenerationFailed: (msg: string) =>
		t(`[Commit Generation Failed] ${msg}`, `[提交信息生成失败] ${msg}`),
	noChangesFound: () =>
		t("No changes found in any workspace repositories.", "工作区所有仓库中未发现更改。"),

	// 验证错误
	valContextLength: () => t("Context Length must be a positive number.", "上下文长度必须为正数。"),
	valMaxTokens: () => t("Max Tokens must be a positive number.", "最大 Token 数必须为正数。"),
	valMaxCompletionTokens: () =>
		t("Max Completion Tokens must be a positive number.", "最大完成 Token 数必须为正数。"),
	valBothMaxTokens: () =>
		t(
			"Cannot set both 'max_tokens' and 'max_completion_tokens'. Use 'max_completion_tokens' only.",
			"不能同时设置 'max_tokens' 和 'max_completion_tokens'，请仅使用 'max_completion_tokens'。"
		),
	valTemperature: () => t("Temperature must be between 0 and 2.", "Temperature 必须在 0 到 2 之间。"),
	valTopP: () => t("Top P must be between 0 and 1.", "Top P 必须在 0 到 1 之间。"),
	valDelay: () => t("Delay must be a non-negative number.", "延迟必须为非负数。"),
	valHeaders: () => t("Custom Headers must be a valid JSON object.", "自定义请求头必须为有效的 JSON 对象。"),
	valExtra: () => t("Extra Parameters must be a valid JSON object.", "额外参数必须为有效的 JSON 对象。"),
	valDuplicateModel: (id: string, configId?: string) =>
		t(
			`A model with ID="${id}"${configId ? ` and Config ID="${configId}"` : ""} already exists. Model ID and Config ID combination must be unique.`,
			`ID="${id}"${configId ? ` 且配置 ID="${configId}"` : ""} 的模型已存在。模型 ID 与配置 ID 的组合必须唯一。`
		),

	// 模型获取相关
	errorFetchingModels: () => t("Error fetching models", "获取模型失败"),
	failedFetchModels: () =>
		t("Failed to fetch models. Check the Developer Console for details.", "获取模型失败，请查看开发者控制台了解详情。"),
	selectModel: (count: number) => t(`Select Model (${count} available)`, `选择模型（${count} 个可用）`),
	noModelsAvailable: () => t("No models available", "无可用模型"),
} as const;
