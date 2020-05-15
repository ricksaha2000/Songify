from django.contrib import admin
from .models import Music
# Register your models here.
class MusicAdmin(admin.ModelAdmin):
	list_display = ('musicid' , 'title')
	# prepopulated_fields = {"slug": ("title",)}
	list_display_links = ('musicid' , 'title')
	list_filter = ('title',)
	# list_editable = ('slug',)
	# search_fields = ('title')
	list_per_page = 25


admin.site.register(Music , MusicAdmin)
