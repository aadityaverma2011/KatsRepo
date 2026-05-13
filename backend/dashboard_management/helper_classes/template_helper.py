from dashboard_management.model_classes.template import Template
class TemplateHelper:
    @staticmethod
    def get_all_templates(request):
        templates = Template.objects.all()
        formatted_data = []

        for t in templates:
            formatted_data.append({
                "id": t.id,
                "title": t.title,
                "is_paid": t.is_paid,
                "image_url": request.build_absolute_uri(t.image.url) if t.image else None,
            })

        return formatted_data